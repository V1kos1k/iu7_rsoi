import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

import { configinfo } from '../config';

import { ICreateOrderRequest } from '../interface/OrderRequest';
import { IOrderInfoResponse } from '../interface/OrderResponse';

import orderRepository from '../repository/order';

const getUserOrders = async (
  orderUid: string
): Promise<IOrderInfoResponse[] | number> => {
  return orderRepository
    .getUserOrdersByUserUid(orderUid)
    .then((result) => {
      if (result.length === 0) return 0;

      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getUserOrder = async (
  userUid: string,
  orderUid: string
): Promise<IOrderInfoResponse | number> => {
  return orderRepository
    .getUserOrderByUserUidAndOrderUid(userUid, orderUid)
    .then((result) => {
      if (!result) return 0;

      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const createOrder = async (
  userUid: string,
  body: ICreateOrderRequest
): Promise<any> => {
  const orderUid = uuidv4();

  return await fetch(`${configinfo.serverHostWarehouse}/api/v1/warehouse/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderUid: orderUid,
      model: body.model,
      size: body.size,
    }),
  })
    .then(async (result) => {
      const data = await result.json();
      if (result.status === 404) throw 404;
      else if (result.status === 409) throw 409;
      else if (result.status === 500) throw 500;
      else return [startWarrantyRequest(data.orderItemUid), data];
    })
    .then((result) => {
      if (result[0] === 400) throw 400;
      return orderRepository.createOrder(
        result[1].orderUid,
        userUid,
        result[1].orderItemUid
      );
    })
    .then((result) => {
      return { orderUid: result.order_uid };
    })
    .catch((err) => {
      throw err;
    });
};

const startWarrantyRequest = async (itemUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostWarranty}/api/v1/warranty/${itemUid}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 204) {
    return response.status;
  } else {
    throw response.status;
  }
};

const warrantyRequest = async (
  orderUid: string,
  reason: string
): Promise<any> => {
  return orderRepository
    .getItemUidByOrderUid(orderUid)
    .then(async (result) => {
      if (!result) throw 404;

      const response = await fetch(
        `${configinfo.serverHostWarehouse}/api/v1/warehouse/${result.item_uid}/warranty`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: reason,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        return data;
      } else {
        throw response.status;
      }
    })
    .catch((err) => {
      throw err;
    });
};

const refundOrder = async (orderUid: string): Promise<any> => {
  return orderRepository
    .getItemUidByOrderUid(orderUid)
    .then(async (result) => {
      if (!result) throw 404;

      return [warehouseReturnItem(result.item_uid), result.item_uid];
    })
    .then((result) => {
      if (result[0] === 404) throw 404;
      else if (result[0] === 500) throw 422;

      return warrentyStopWarranty(result[1]);
    })
    .then((result) => {
      if (result[0] === 404) throw 404;
      else if (result[0] === 500) throw 422;

      return orderRepository.cancelOrder(orderUid);
    })
    .catch((err) => {
      throw err;
    });
};

const warehouseReturnItem = async (ItemUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostWarehouse}/api/v1/warehouse/${ItemUid}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.status;
};

const warrentyStopWarranty = async (ItemUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostWarranty}/api/v1/warranty/${ItemUid}`,
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
  createOrder,
  warrantyRequest,
  refundOrder,
};
