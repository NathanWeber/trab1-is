import { NextFunction, Request, Response } from 'express';

import service from './service';


async function listContinentsByCode(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listContinentsByCode();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function listContrysByCode(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listContrysByCode();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}


export default {
  listContinentsByCode,
  listContrysByCode,
};
