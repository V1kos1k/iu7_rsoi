import { Request, Response } from 'express';

import sessionService from '../service/session';

const getUserToken = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  if (!(password && login)) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: login or password not found',
      })
    );
    return;
  }

  await sessionService
    .getUserToken(login, password)
    .then((result) => {
      res
        .writeHead(200, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${result}`,
        })
        .end();
    })
    .catch((err) => {
      if (err === 404)
        res
          .writeHead(404, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'not found' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

const verifyToken = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const token = (req.headers.authorization || '').split(' ')[1] || '';

  if (!token) {
    res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'bad request: login or password not found',
      })
    );
    return;
  }

  await sessionService
    .verifyToken(token)
    .then((result) => {
      console.log(result);
      res
        .writeHead(200, {
          'Content-Type': 'application/json',
          UID: result,
        })
        .end();
    })
    .catch((err) => {
      if (err === 401)
        res
          .writeHead(401, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'unauthorized' }));
      else
        res
          .writeHead(500, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ message: 'internal server error' }));
    });
};

export default {
  getUserToken,
  verifyToken,
};
