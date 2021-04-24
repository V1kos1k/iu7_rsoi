import { pool } from '../configDb';

const getUserByLoginAndPassword = async (
  login: string,
  password: string
): Promise<any> => {
  return await pool
    .query(
      `select user_uid from users where name='${login}' and password_hash=MD5(${password}::text)`
    )
    .then((result) => {
      return result.rows[0].user_uid;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getUserByLoginAndPassword,
};
