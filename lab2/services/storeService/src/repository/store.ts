import {} from '../interface/StoreResponse';
import { pool } from '../configDb';

const getUserByUserUid = async (userUid: string): Promise<any> => {
  return await pool
    .query(`select * from users where user_uid='${userUid}'`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

// const getUserOrderByUserUidAndOrderUid = async (
//   userUid: string,
//   orderUid: string
// ): Promise<IOrderInfoResponse> => {
//   return await pool
//     .query(
//       `select * from orders where user_uid='${userUid}' and order_uid='${orderUid}'`
//     )
//     .then((result) => {
//       return {
//         orderUid: result.rows[0].order_uid,
//         orderDate: result.rows[0].order_date,
//         itemUid: result.rows[0].item_uid,
//         status: result.rows[0].status,
//       };
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const getOrderByOrderUid = async (
//   orderUid: string
// ): Promise<IOrderInfoResponse> => {
//   return await pool
//     .query(`select * from orders where order_uid='${orderUid}'`)
//     .then((result) => {
//       return {
//         orderUid: result.rows[0].order_uid,
//         orderDate: result.rows[0].order_date,
//         itemUid: result.rows[0].item_uid,
//         status: result.rows[0].status,
//       };
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const createOrder = async (
//   orderUid: string,
//   userUid: string,
//   orderItemId: string
// ): Promise<any> => {
//   let date = new Date().toUTCString();

//   return await pool
//     .query(
//       `INSERT INTO orders (item_uid, order_date, order_uid, status, user_uid) VALUES ('${orderItemId}', '${date}', '${orderUid}', 'PAID', '${userUid}') RETURNING order_uid`
//     )
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const getItemUidByOrderUid = async (orderUid: string): Promise<any> => {
//   return await pool
//     .query(`select item_uid from orders where order_uid='${orderUid}'`)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const cancelOrder = async (orderUid: string): Promise<any> => {
//   return await pool
//     .query(`delete from orders where order_uid='${orderUid}'`)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

export default {
  getUserByUserUid,
  // getUserOrderByUserUidAndOrderUid,
  // createOrder,
  // getItemUidByOrderUid,
  // getOrderByOrderUid,
  // cancelOrder,
};
