import { request, response } from 'express';
import { constants } from 'fs';
import fetch from 'node-fetch';
import CircuitBreaker from 'opossum';

import { configinfo } from '../config';

import { ICreatePurchaseRequest } from '../interface/StoreRequest';
import {
  IUserOrderResponse,
  IWarrantyResponse,
} from '../interface/StoreResponse';

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 10000, // After 30 seconds, try again.
};

const getUserOrders = async (userUid: string): Promise<any> => {
  const breaker = new CircuitBreaker(getOrderInfoByUser, options);

  breaker.fallback((err) => {
    console.log('fallback ', err);
  });
  return breaker
    .fire(userUid)
    .then((result) => {
      if (!result || result.status !== 200) throw 422;

      return result.json();
    })
    .catch((err) => {
      console.log('err ', err);
      throw err;
    });
};

const getUserOrder = async (
  userUid: string,
  orderUid: string
): Promise<IUserOrderResponse> => {
  const breaker = new CircuitBreaker(fetch, options);

  breaker.fallback((err) => {
    console.log('fallback ', err);
  });

  let resData: any[] = [];
  return breaker
    .fire(`${configinfo.serverHostOrder}/api/v1/orders/${userUid}/${orderUid}`)

    .then(async (result) => {
      if (result.status !== 200) throw 422;
      const data = await result.json();
      resData.push(data);

      return breaker.fire(
        `${configinfo.serverHostWarehouse}/api/v1/warehouse/${data.itemUid}`
      );
    })
    .then(async (result) => {
      let data = { model: undefined, size: undefined };
      if (result && result.status === 200) data = await result.json();
      resData.push(data);

      Object.assign(resData[0], resData[1]);

      return breaker.fire(
        `${configinfo.serverHostWarranty}/api/v1/warranty/${resData[0].itemUid}`
      );
    })
    .then(async (result) => {
      let data = { warrantyDate: undefined, status: undefined };
      if (result && result.status === 200) data = await result.json();

      return {
        orderUid: resData[0].orderUid,
        date: resData[0].orderDate,
        model: resData[1].model,
        size: resData[1].size,
        warrantyDate: data.warrantyDate,
        warrantyStatus: data.status,
      };
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const makePurchase = async (
  userUid: string,
  body: ICreatePurchaseRequest
): Promise<any> => {
  const breaker = new CircuitBreaker(postCreateOrderRequest, options);

  breaker.fallback((err) => {
    console.log('fallback ', err);
  });

  // return breaker.fire(`${configinfo.serverHostOrder}/api/v1/orders/${userUid}`)
  return postCreateOrderRequest(userUid, body)
    .then(async (result) => {
      if (result.status === 409) throw 409;
      else if (result.status !== 200) throw 422;
      return await result.json();
    })
    .catch((err) => {
      throw err;
    });
};

const warrantyRequest = async (
  userUid: string,
  orderUid: string,
  body: ICreatePurchaseRequest
): Promise<IWarrantyResponse> => {
  return postWarrantyRequest(orderUid, body)
    .then((result) => {
      if (result.statusResponse !== 200) throw 422;
      return {
        orderUid: orderUid,
        warrantyDate: result.warrantyDate,
        decision: result.decision,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const refundOrder = async (
  userUid: string,
  orderUid: string
): Promise<number> => {
  return deleteRefundOrderRequest(orderUid)
    .then((result) => {
      if (result !== 204) throw 422;
      return 204;
    })
    .catch((err) => {
      throw err;
    });
};

const getOrderInfoByUser = async (userUid: string): Promise<any> => {
  const response = fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${userUid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('!!!!! ', (await response).status);

  return response;
};

const postCreateOrderRequest = async (
  userUid: string,
  body: ICreatePurchaseRequest
): Promise<any> => {
  const response = fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${userUid}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  return response;
};

const postWarrantyRequest = async (
  orderUid: string,
  body: ICreatePurchaseRequest
): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${orderUid}/warranty`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return { statusResponse: response.status, ...data };
};

const deleteRefundOrderRequest = async (orderUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${orderUid}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.status;
};

export default {
  getUserOrders,
  getUserOrder,
  makePurchase,
  warrantyRequest,
  refundOrder,
};
