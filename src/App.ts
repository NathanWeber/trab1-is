import { AxiosError } from 'axios';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';

import Routes from './routes';

class App {
  public express: express.Application = null;

  private httpServer: http.Server = null;

  public constructor() {
    this.express = express();
    this.middleware();
    this.express.use('/api', Routes);

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      // 404
      res.status(404).send();
    });

    this.express.use((err: AxiosError, req: Request, res: Response, next: NextFunction) => {
      console.log({err})  
      return res.status(500).send(err);
    });
  }

  public start(): void {
    this.httpServer = http.createServer(this.express);
    this.httpServer.listen(3000, 'localhost', (): void => {
      // eslint-disable-next-line no-console
      console.log(`Worker ${process.pid} running server localhost:3000`);
    });
  }

  public close(): void {
    if (this.httpServer !== null) {
      this.httpServer.close();
    }
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Methods',
          'POST, GET, OPTIONS, DELETE, PUT',
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-uuid, authorization',
        );
        next();
      },
    );
    this.express.use(compression());
  }
}
export default App;
