import {
  ISessionResponse,
  ISessionResponseAll,
} from "../interface/SessionResponse";
import { pool } from "../configDb";
import { ISessionRequestBody } from "../interface/SessionRequest";

const getUserByLoginAndPassword = async (
  login: string,
  password: string
): Promise<ISessionResponse> => {
  return await pool
    .query(
      `select user_uid, user_role 
        from users 
        where name='${login}' and password_hash=MD5('${password}')`
    )
    .then((result) => {
      return {
        userUid: result.rows[0].user_uid,
        userRole: result.rows[0].user_role,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const getAllUsers = async (): Promise<ISessionResponseAll[]> => {
  return await pool
    .query(`select user_uid, name, user_role from users`)
    .then((result) => {
      return result.rows.map((item) => ({
        userUid: item.user_uid,
        name: item.name,
        userRole: item.user_role,
      }));
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const createUser = async (props: ISessionRequestBody): Promise<any> => {
  const { name, userUid, password, userRole } = props;
  return await pool
    .query(
      `insert into users (name, user_uid, password_hash, user_role)
      values ('${name}', '${userUid}', MD5('${password}'), '${userRole}')
      RETURNING user_uid`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log("createUser err", err);
      throw err;
    });
};

const deleteUser = async (userUid: string) => {
  return await pool
    .query(`delete from users where user_uid='${userUid}'`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default {
  getUserByLoginAndPassword,
  getAllUsers,
  createUser,
  deleteUser,
};
