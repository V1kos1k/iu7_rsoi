import { generateKeyPair } from 'crypto';
import jwt from 'jsonwebtoken';

import sessionRepository from '../repository/session';

const passphrase = 'session service keys';

let keyPrivate = '';
let keyPublic = '';

generateKeyPair(
  'rsa',
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
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

      return token;
    })
    .catch((err) => {
      console.log(err);
      throw 404;
    });
};

const verifyDate = (exp: number) => {
  if (new Date().getTime() / 1000 < exp) return true;
  return false;
};

const createToken = (uid: string) => {
  let token = jwt.sign(
    { uid: uid },
    { key: keyPrivate, passphrase },
    {
      algorithm: 'RS256',
      expiresIn: '1h',
    }
  );

  return token;
};

const verifyToken = async (token: string): Promise<any> => {
  return jwt.verify(
    token,
    keyPublic,
    { algorithms: ['RS256'] },
    (err, payload) => {
      if (err) throw 401;
      const payloadObj = Object(payload);
      let isActual = verifyDate(payloadObj.exp);

      if (isActual) {
        console.log('UID ', payloadObj.uid);
        return payloadObj.uid;
      } else {
        const resT = createToken(payloadObj.uid);
        return resT;
      }
    }
  );
};

export default {
  getUserToken,
  verifyToken,
};
