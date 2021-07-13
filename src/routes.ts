import express from 'express';
import {
  readdirSync, statSync, existsSync,
} from 'fs';
import { join, resolve } from 'path';

const directory = resolve(__dirname, 'domains');

const isDirectory = (path) => statSync(path).isDirectory();

function concat(routes, dir) {
  const path = `${dir}/routes`;
  if (!existsSync(path + '.ts')) {
    return routes;
  }
  // eslint-disable-next-line
  const mod = require(path).default;
  return routes.concat(mod);
}

function load(arr, app) {
  arr.forEach((route) => {
    const fn = app[route.method];
    const { handlers } = route;

    fn.call(app, route.path, handlers);
  });
  return app;
}

const finalRoutes = readdirSync(directory)
  .map((file) => join(directory, file))
  .filter(isDirectory)
  .reduce(concat, []);

export default load(finalRoutes, express.Router());
