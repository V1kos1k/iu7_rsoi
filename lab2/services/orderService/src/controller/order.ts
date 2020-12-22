import { Request, Response } from 'express';

import {
  IOrderWarrantyRequest,
  ICreateOrderRequest,
  IOrderWarrantyRequestParameter,
  IUserOrdersParameter,
  IUserOrderParameter,
} from '../interface/OrderRequest';

import {
  ICreateOrderResponse,
  IOrderInfoResponse,
  IOrderWarrantyResponse,
} from '../interface/OrderResponse';

import orderService from '../service/order';

const getUserOrders = async (
  req: Request<IUserOrdersParameter>,
  res: Response<IOrderInfoResponse[]>
): Promise<void> => {
  const { userUid } = req.params;

  if (!String(userUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid, must be string',
      })
    );
    return;
  }

  await orderService
    .getUserOrders(userUid)
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

const getUserOrder = async (
  req: Request<IUserOrderParameter>,
  res: Response<IOrderInfoResponse>
): Promise<void> => {
  const { userUid, orderUid } = req.params;

  if (!String(userUid) && !String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid and orderUid, must be string',
      })
    );
    return;
  }

  await orderService
    .getUserOrder(userUid, orderUid)
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

const createOrder = async (
  req: Request<IUserOrdersParameter, ICreateOrderRequest>,
  res: Response<any>
): Promise<void> => {
  const { userUid } = req.params;

  if (!String(userUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid and orderUid, must be string',
      })
    );
    return;
  }

  const { body } = req;

  if (!body.model || !body.size) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: model or size not found',
      })
    );
    return;
  }

  await orderService
    .createOrder(userUid, body)
    .then((result) => {
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err === 400)
        res.writeHead(400, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            message: 'bad request in warrantyService',
          })
        );
      if (err === 404)
        res.writeHead(404, { 'Content-Type': 'application/json' }).end(
          JSON.stringify({
            message: `Item with model ${body.model} and size ${body.size} not found`,
          })
        );
      else if (err === 409)
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

const warrantyRequest = async (
  req: Request<IOrderWarrantyRequestParameter, IOrderWarrantyRequest>,
  res: Response<any>
): Promise<void> => {
  const { orderUid } = req.params;

  if (!String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid orderUid, must be string',
      })
    );
    return;
  }

  const { body } = req;

  if (!body.reason) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: reason not found',
      })
    );
    return;
  }

  await orderService
    .warrantyRequest(orderUid, body.reason)
    .then((result) => {
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err === 404)
        res
          .writeHead(404, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'not found' }));
      else if (err === 422)
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'external request failed' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const refundOrder = async (
  req: Request<IOrderWarrantyRequestParameter>,
  res: Response<void>
): Promise<void> => {
  const { orderUid } = req.params;

  if (!String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid orderUid, must be string',
      })
    );
    return;
  }

  await orderService
    .refundOrder(orderUid)
    .then((result) => {
      res
        .writeHead(204, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err === 404)
        res
          .writeHead(404, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'not found' }));
      else if (err === 422)
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'external request failed' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

export default {
  getUserOrders,
  getUserOrder,
  createOrder,
  warrantyRequest,
  refundOrder,
};
