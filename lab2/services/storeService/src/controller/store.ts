import { Request, Response } from 'express';

import {
  ICreatePurchaseRequest,
  IStoreOrderRequestParameter,
  IStoreRequestParameter,
  IStoreWarrantyRequest,
} from '../interface/StoreRequest';

import { IWarrantyResponse } from '../interface/StoreResponse';

import storeService from '../service/store';

const getUserOrders = async (
  req: Request<IStoreRequestParameter>,
  res: Response<any>
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

  await storeService
    .getUserOrders(userUid)
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

const getUserOrder = async (
  req: Request<IStoreOrderRequestParameter>,
  res: Response<any>
): Promise<void> => {
  const { userUid, orderUid } = req.params;

  if (!String(userUid) || !String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid, must be string',
      })
    );
    return;
  }

  await storeService
    .getUserOrder(userUid, orderUid)
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
      else if (err === 422) {
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'external request failed' }));
      } else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const makePurchase = async (
  req: Request<IStoreRequestParameter, ICreatePurchaseRequest>,
  res: Response<any>
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

  const { body } = req;

  if (!body.model || !body.size) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: model or size not found',
      })
    );
    return;
  }

  await storeService
    .makePurchase(userUid, body)
    .then((result) => {
      res
        .writeHead(201, {
          'Content-Type': 'application/json',
          Location: `/${result.orderUid}`,
        })
        .end();
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
      else if (err === 409)
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'Item not available' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const warrantyRequest = async (
  req: Request<IStoreOrderRequestParameter, IStoreWarrantyRequest>,
  res: Response<IWarrantyResponse | any>
): Promise<void> => {
  const { userUid, orderUid } = req.params;

  if (!String(userUid) || !String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid, must be string',
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

  await storeService
    .warrantyRequest(userUid, orderUid, body)
    .then((result) => {
      res
        .writeHead(200, {
          'Content-Type': 'application/json',
        })
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
      else if (err === 409)
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'Item not available' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const refundOrder = async (
  req: Request<IStoreOrderRequestParameter, IStoreWarrantyRequest>,
  res: Response<any>
): Promise<void> => {
  const { userUid, orderUid } = req.params;

  if (!String(userUid) || !String(orderUid)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: invalid userUid, must be string',
      })
    );
    return;
  }

  await storeService
    .refundOrder(userUid, orderUid)
    .then(() => {
      res
        .writeHead(204, {
          'Content-Type': 'application/json',
        })
        .end();
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
      else if (err === 409)
        res
          .writeHead(422, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'Item not available' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

export default {
  getUserOrders,
  getUserOrder,
  makePurchase,
  warrantyRequest,
  refundOrder,
};
