import { pool } from '../configDb';

import { IWarrantyResponseBody } from '../interface/WarrantyResponse';

const getWarrantyStatus = async (
  itemUid: string
): Promise<IWarrantyResponseBody | number | any> => {
  return await pool
    .query(
      `select item_uid, warranty_date, status from warranty where item_uid='${itemUid}'`
    )
    .then((result) => {
      if (result.rowCount == 0) return 0;
      return {
        itemUid: result.rows[0].item_uid,
        warrantyDate: result.rows[0].warranty_date,
        status: result.rows[0].status,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const startWarrantyPeriod = async (itemUid: string): Promise<boolean> => {
  let date = new Date().toUTCString();
  return await pool
    .query(
      `insert into warranty (item_uid, status, warranty_date) values ('${itemUid}', 'ON_WARRANTY', '${date}') returning *`
    )
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteWarrantyStatus = async (itemUid: string): Promise<number> => {
  return await pool
    .query(
      `update warranty set status='REMOVED_FROM_WARRANTY' where item_uid='${itemUid}'`
    )
    .then((result) => {
      return result.rowCount;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getWarrantyStatus,
  startWarrantyPeriod,
  deleteWarrantyStatus,
};
