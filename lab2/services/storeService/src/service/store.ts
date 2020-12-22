import fetch from 'node-fetch';

import { configinfo } from '../config';

import { ICreatePurchaseRequest } from '../interface/StoreRequest';
import {
  IUserOrderResponse,
  IWarrantyResponse,
} from '../interface/StoreResponse';

import storeRepository from '../repository/store';

const getUserOrders = async (userUid: string): Promise<any> => {
  return storeRepository
    .getUserByUserUid(userUid)
    .then((result) => {
      if (!result) throw 404;

      return getOrderInfoByUser(result.user_uid);
    })
    .then(async (result) => {
      if (result.status !== 200) throw 422;

      return await result.json();
    })
    .catch((err) => {
      throw err;
    });
};

const getUserOrder = async (
  userUid: string,
  orderUid: string
): Promise<IUserOrderResponse> => {
  return storeRepository
    .getUserByUserUid(userUid)
    .then((result) => {
      if (!result) throw 404;

      return getOrderInfoByUserAndOrderUid(result.user_uid, orderUid);
    })
    .then((result) => {
      if (result.statusResponse !== 200) throw 422;
      return Promise.all([
        Promise.resolve(getWarehauseInfoByItemUid(result.itemUid)),
        result,
      ]);
    })
    .then((result) => {
      if (result[0].statusResponse !== 200) throw 422;

      Object.assign(result[0], result[1]);

      return Promise.all([
        Promise.resolve(getWarrantyInfoByItemIud(result[0].itemUid)),
        result[0],
      ]);
    })
    .then((result) => {
      if (result[0].statusResponse !== 200) throw 422;

      return {
        orderUid: result[1].orderUid,
        date: result[1].orderDate,
        model: result[1].model,
        size: result[1].size,
        warrantyDate: result[0].warrantyDate,
        warrantyStatus: result[0].status,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const makePurchase = async (
  userUid: string,
  body: ICreatePurchaseRequest
): Promise<any> => {
  return storeRepository
    .getUserByUserUid(userUid)
    .then((result) => {
      if (!result) throw 404;

      return postCreateOrderRequest(result.user_uid, body);
    })
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
  return storeRepository
    .getUserByUserUid(userUid)
    .then((result) => {
      if (!result) throw 404;

      return postWarrantyRequest(orderUid, body);
    })
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
  return storeRepository
    .getUserByUserUid(userUid)
    .then((result) => {
      if (!result) throw 404;

      return deleteRefundOrderRequest(orderUid);
    })
    .then((result) => {
      if (result !== 204) throw 422;
      return 204;
    })
    .catch((err) => {
      throw err;
    });
};

const getOrderInfoByUser = async (userUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${userUid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

const getOrderInfoByUserAndOrderUid = async (
  userUid: string,
  orderUid: string
): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostOrder}/api/v1/orders/${userUid}/${orderUid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return { statusResponse: response.status, ...data };
};

const getWarehauseInfoByItemUid = async (itemUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostWarehouse}/api/v1/warehouse/${itemUid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return { statusResponse: response.status, ...data };
};

const getWarrantyInfoByItemIud = async (itemUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostWarranty}/api/v1/warranty/${itemUid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return { statusResponse: response.status, ...data };
};

const postCreateOrderRequest = async (
  userUid: string,
  body: ICreatePurchaseRequest
): Promise<any> => {
  const response = await fetch(
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
