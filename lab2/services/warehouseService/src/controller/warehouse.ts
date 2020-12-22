import { Request, Response } from 'express';

import {
  IOrderItemRequest,
  IOrderWarrantyRequest,
} from '../interface/WarehouseRequest';

import {
  IItemInfoResponse,
  IOrderItemResponse,
} from '../interface/WarehouseResponse';

import warehouseService from '../service/warehouse';

const getItemInfo = async (
  req: Request<any>,
  res: Response<IItemInfoResponse>
): Promise<void> => {
  const { orderItemUid } = req.params;

  if (!String(orderItemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid orderItemUid, must be number',
      })
    );
    return;
  }

  await warehouseService
    .getItemInfo(orderItemUid)
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

const takeItem = async (
  req: Request<IOrderItemRequest>,
  res: Response<IOrderItemResponse>
): Promise<void> => {
  const { body } = req;

  if (!body.model || !body.orderUid || !body.size) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: reason or availableCount not found',
      })
    );
    return;
  }

  await warehouseService
    .takeItem(body)
    .then((result) => {
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err === 0)
        res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            message: `Item with model ${body.model} and size ${body.size} not found`,
          })
        );
      else if (err === 1)
        res.writeHead(409, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            message: `Item ${body.model} is finished on warehouse`,
          })
        );
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const returnItem = async (
  req: Request<any>,
  res: Response<void>
): Promise<void> => {
  const { orderItemUid } = req.params;

  if (!String(orderItemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid orderItemUid, must be number',
      })
    );
    return;
  }

  await warehouseService
    .returnItem(orderItemUid)
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

const warrantyRequest = async (
  req: Request<any>,
  res: Response<void>
): Promise<void> => {
  const { orderItemUid } = req.params;

  const { body } = req;

  if (!String(orderItemUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid orderItemUid, must be number',
      })
    );
    return;
  }

  if (!body.reason) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: reason not found',
      })
    );
    return;
  }

  await warehouseService
    .warrantyRequest(orderItemUid, body.reason)
    .then((result) => {
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err === 404)
        res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            message: `Warranty not found for itemUid '${orderItemUid}'`,
          })
        );
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

export default {
  getItemInfo,
  takeItem,
  returnItem,
  warrantyRequest,
};
