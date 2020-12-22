import { Request, Response } from 'express';

import { IErrorResponse } from '../interface/ErrorResponse';
import {
  IWarrantyRequest,
  IWarrantyRequestParamter,
} from '../interface/WarrantyRequest';
import {
  IWarrantyResponse,
  IWarrantyResponseBody,
} from '../interface/WarrantyResponse';

import warrantyService from '../service/warranty';

const getWarrantyStatus = async (
  req: Request<IWarrantyRequestParamter>,
  res: Response<IWarrantyResponseBody | number | IErrorResponse | any>
): Promise<void> => {
  const { itemUid } = req.params;

  if (!String(itemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid itemUid, must be number',
      })
    );
    return;
  }

  await warrantyService
    .getWarrantyStatus(itemUid)
    .then((result) => {
      result !== 0
        ? res
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(result))
        : res
            .writeHead(404, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ message: 'not found' }));
    })
    .catch(() =>
      res
        .writeHead(500, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'internal server error' }))
    );
};

const startWarrantyPeriod = async (
  req: Request<IWarrantyRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { itemUid } = req.params;

  if (!String(itemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid itemUid, must be number',
      })
    );
    return;
  }

  await warrantyService
    .startWarrantyPeriod(itemUid)
    .then(() => {
      return res.writeHead(204, { 'Content-Type': 'application/json' }).end();
    })
    .catch((err) => {
      return res
        .writeHead(500, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const deleteWarrantyStatus = async (
  req: Request<IWarrantyRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { itemUid } = req.params;

  if (!String(itemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid itemUid, must be number',
      })
    );
    return;
  }

  await warrantyService
    .deleteWarrantyStatus(itemUid)
    .then((result) => {
      result !== 0
        ? res.writeHead(204, { 'Content-Type': 'application/json' }).end()
        : res
            .writeHead(404, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ message: 'not found' }));
    })
    .catch(() =>
      res
        .writeHead(500, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'internal server error' }))
    );
};

const warrantyDecision = async (
  req: Request<IWarrantyRequestParamter, IWarrantyRequest, any>,
  res: Response<IWarrantyResponse | any | IErrorResponse>
): Promise<void> => {
  const { itemUid } = req.params;
  const { body } = req;

  if (!String(itemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid itemUid, must be number',
      })
    );
    return;
  }

  if (!body.reason || body.availableCount == null) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: reason or availableCount not found',
      })
    );
    return;
  }

  await warrantyService
    .warrantyDecision(itemUid, body)
    .then((result) => {
      result !== 0
        ? res
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(result))
        : res
            .writeHead(404, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ message: 'not found' }));
    })
    .catch(() =>
      res
        .writeHead(500, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'internal server error' }))
    );
};

export default {
  getWarrantyStatus,
  startWarrantyPeriod,
  deleteWarrantyStatus,
  warrantyDecision,
};
