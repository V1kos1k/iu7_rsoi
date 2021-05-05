import { IBonusResponseBody } from "../interface/BonusResponse";
import { pool } from "../configDb";

// import { IBonusResponseBody } from "../interface/BonusResponse";

const getBonusStatus = async (userUid: string): Promise<number | any> => {
  return await pool
    .query(`select balance from miles where user_uid='${userUid}'`)
    .then((result) => {
      if (result.rowCount == 0) return 0;
      return {
        balance: result.rows[0].balance,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const addBonus = async (userUid: string, miles: number): Promise<any> => {
  return await pool
    .query(
      `update miles set balance=balance+${miles} where user_uid='${userUid}' RETURNING balance`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const reduceBonus = async (userUid: string, miles: number): Promise<any> => {
  return await pool
    .query(
      `update miles set balance=balance-${miles} where user_uid='${userUid}' RETURNING balance`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const createBonus = async (userUid: string): Promise<any> => {
  return await pool
    .query(
      `insert into miles (user_uid, balance) values ('${userUid}', 0)  RETURNING id`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getBonusStatus,
  addBonus,
  reduceBonus,
  createBonus,
};
