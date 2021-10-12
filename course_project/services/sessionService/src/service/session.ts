import { generateKeyPair } from "crypto";
import jwt from "jsonwebtoken";
import { ISessionRequestBody, UserRole } from "../interface/SessionRequest";
import { ISessionResponse } from "../interface/SessionResponse";

import { v4 as uuidv4 } from "uuid";

import sessionRepository from "../repository/session";

const passphrase = "session service keys";

let keyPrivate = "";
let keyPublic = "";

generateKeyPair(
  "rsa",
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  },
  (err, publicKey, privateKey) => {
    keyPublic = publicKey;
    keyPrivate = privateKey;
  }
);

const getUserToken = async (login: string, password: string): Promise<any> => {
  return sessionRepository
    .getUserByLoginAndPassword(login, password)
    .then((result) => {
      let token = createToken(result);

      return { token, role: result.userRole };
    })
    .catch((err) => {
      console.log("getUserToken", err);
      throw 404;
    });
};

const verifyDate = (exp: number) => {
  if (new Date().getTime() / 1000 < exp) return true;
  return false;
};

const createToken = (props: ISessionResponse) => {
  const { userUid, userRole } = props;
  let token = jwt.sign(
    { uid: userUid, role: userRole },
    { key: keyPrivate, passphrase },
    {
      algorithm: "RS256",
      expiresIn: "1h",
    }
  );

  return token;
};

const verifyToken = async (token: string): Promise<any> => {
  return jwt.verify(
    token,
    keyPublic,
    { algorithms: ["RS256"] },
    (err, payload) => {
      if (err) throw 401;
      const payloadObj = Object(payload);
      let isActual = verifyDate(payloadObj.exp);

      if (isActual) {
        return { uid: payloadObj.uid, role: payloadObj.role };
      } else {
        const resT = createToken(payloadObj.uid);
        return { uid: resT, role: payloadObj.role };
      }
    }
  );
};

const getAllUsers = async (): Promise<any> => {
  return sessionRepository
    .getAllUsers()
    .then((result) => {
      if (!result) throw [404, "Пользователи не найдены"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const createUser = async (
  name: string,
  password: string,
  userRole: UserRole
): Promise<any> => {
  const userUid = uuidv4();
  return sessionRepository
    .createUser({
      name,
      userUid,
      password,
      userRole,
    })
    .then((result) => {
      if (!result) throw [418, "Я чайник и не знаю что случилось :("];
      return result;
    })
    .catch((err) => {
      console.log("createUser service err", err);
      throw err;
    });
};

const deleteUser = async (token: string, userUid: string) => {
  return jwt.verify(
    token,
    keyPublic,
    { algorithms: ["RS256"] },
    (err, payload) => {
      if (err) throw [401, "Не авторизован"];
      const payloadObj = Object(payload);

      if (payloadObj.role !== "admin")
        throw [403, "Действие недоступно пользователю"];

      const userUid = uuidv4();
      return sessionRepository
        .deleteUser(userUid)
        .then((result) => {
          if (!result) throw [404, "Пользователь не найден"];
          return result;
        })
        .catch((err) => {
          console.log("createUser service err", err);
          throw err;
        });
    }
  );
};

export default {
  getUserToken,
  verifyToken,
  getAllUsers,
  createUser,
  deleteUser,
};
