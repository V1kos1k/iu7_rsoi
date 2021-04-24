import fetch from 'node-fetch';

import { configinfo } from '../config';

import {
  IOrderItemRequest,
  IOrderWarrantyRequest,
} from '../interface/WarehouseRequest';
import {
  IItemInfoResponse,
  IOrderItemResponse,
  IOrderWarrantyResponse,
} from '../interface/WarehouseResponse';

import warehouseRepository from '../repository/warehouse';

const getItemInfo = async (
  orderItemUid: string
): Promise<IItemInfoResponse | number> => {
  return warehouseRepository
    .getItemIdByOrderItemUid(orderItemUid)
    .then((result) => {
      if (!result) return 0;

      return warehouseRepository.getItemInfoByItemId(result.item_id);
    })
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const takeItem = async (
  body: IOrderItemRequest
): Promise<IOrderItemResponse | number> => {
  return warehouseRepository
    .getItemByModelAndSize(body.model, body.size)
    .then((result) => {
      if (!result) throw 0;
      else if (result.available_count < 1) throw 1;

      return warehouseRepository.updateItemAvailableCountByModelAndSize(
        body.model,
        body.size
      );
    })
    .then((result) => {
      return warehouseRepository.createOrderItem(body.orderUid, result.id);
    })
    .then((result) => {
      return {
        orderItemUid: result.order_item_uid,
        orderUid: body.orderUid,
        model: body.model,
        size: body.size,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const returnItem = async (orderItemUid: string): Promise<boolean | number> => {
  return warehouseRepository
    .updateCanceledByOrderItemUid(orderItemUid, true)
    .then((result) => {
      if (!result) return 0;

      return warehouseRepository.updateItemAvailableCountByItemId(
        result.item_id
      );
    })
    .then((result) => {
      if (!result) return 0;
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

const warrantyRequest = async (
  orderItemUid: string,
  reason: string
): Promise<IOrderWarrantyResponse | number> => {
  return warehouseRepository
    .getItemIdByOrderItemUid(orderItemUid)
    .then((result) => {
      if (!result) return 0;

      return warehouseRepository.getItemAvailableCountByItemId(result.item_id);
    })
    .then(async (result) => {
      if (!result) throw 404;

      const response = await fetch(
        `${configinfo.serverHostWarranty}/api/v1/warranty/${orderItemUid}/warranty`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: reason,
            availableCount: result.available_count,
          }),
        }
      );

      const data = response.json();

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

export default {
  getItemInfo,
  takeItem,
  returnItem,
  warrantyRequest,
};
