import { pool } from '../configDb';

import { IItemInfoResponse } from '../interface/WarehouseResponse';

// import { IWarehouseResponseBody } from '../interface/warehouseResponse';

const getItemIdByOrderItemUid = async (orderItemUid: string): Promise<any> => {
  return await pool
    .query(
      `select item_id from order_item where order_item_uid='${orderItemUid}'`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const getItemInfoByItemId = async (
  itemId: number
): Promise<any | IItemInfoResponse> => {
  return await pool
    .query(`select model, size from items where id=${itemId}`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const getItemByModelAndSize = async (
  model: string,
  size: string
): Promise<any> => {
  return await pool
    .query(
      `select id, available_count from items where model='${model}' and size='${size}'`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const getItemAvailableCountByItemId = async (
  itemId: number
): Promise<any | IItemInfoResponse> => {
  return await pool
    .query(`select available_count from items where id=${itemId}`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const updateItemAvailableCountByModelAndSize = async (
  model: string,
  size: string
): Promise<any> => {
  return await pool
    .query(
      `update items set available_count=available_count-1 where model='${model}' and size='${size}' RETURNING id`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const updateItemAvailableCountByItemId = async (
  itemId: number
): Promise<any> => {
  return await pool
    .query(
      `update items set available_count=available_count+1 where id=${itemId} RETURNING id`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const updateCanceledByOrderItemUid = async (
  orderItemUid: string,
  canceled: boolean
): Promise<any> => {
  return await pool
    .query(
      `update order_item set canceled=${canceled} where order_item_uid='${orderItemUid}' returning item_id`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const createOrderItem = async (
  orderUid: string,
  itemId: string
): Promise<any> => {
  return await pool
    .query(
      `INSERT INTO order_item (canceled, order_item_uid, order_uid, item_id) VALUES (false,  uuid_generate_v4(), '${orderUid}', ${itemId}) RETURNING order_item_uid`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getItemIdByOrderItemUid,
  getItemInfoByItemId,
  getItemByModelAndSize,
  getItemAvailableCountByItemId,
  updateItemAvailableCountByModelAndSize,
  updateCanceledByOrderItemUid,
  updateItemAvailableCountByItemId,
  createOrderItem,
};
