import { Request, Response } from "express";
import { ISessionRequest } from "../interface/SessionRequest";

import sessionService from "../service/session";

const getUserToken = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  if (!(password && login)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: login or password not found",
      })
    );
    return;
  }

  await sessionService
    .getUserToken(login, password)
    .then((result) => {
      res
        .writeHead(200, {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result}`,
        })
        .end();
    })
    .catch((err) => {
      if (err === 404)
        res
          .writeHead(404, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "not found" }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

const verifyToken = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const token = (req.headers.authorization || "").split(" ")[1] || "";

  if (!token) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: token not found",
      })
    );
    return;
  }

  await sessionService
    .verifyToken(token)
    .then((result) => {
      res
        .writeHead(200, {
          "Content-Type": "application/json",
          UID: result,
        })
        .end();
    })
    .catch((err) => {
      if (err === 401)
        res
          .writeHead(401, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "unauthorized" }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

const getAllUsers = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const token = (req.headers.authorization || "").split(" ")[1] || "";

  if (!token) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: token not found",
      })
    );
    return;
  }

  await sessionService
    .getAllUsers(token)
    .then((result) => {
      res
        .writeHead(200, {
          "Content-Type": "application/json",
          UID: result,
        })
        .end(JSON.stringify(result));
    })
    .catch((err) => {
      if (err[0])
        res
          .writeHead(err[0], { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: err[1] }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

const createUser = async (
  req: Request<ISessionRequest>,
  res: Response<any>
): Promise<void> => {
  const token = (req.headers.authorization || "").split(" ")[1] || "";

  const { name, password, userRole } = req.body;

  if (!token || !name || !password || !userRole) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: token or name or password or userRole not found",
      })
    );
    return;
  }

  await sessionService
    .createUser(token, name, password, userRole)
    .then((result) => {
      res
        .writeHead(201, {
          "Content-Type": "application/json",
          // UID: result,
        })
        .end();
    })
    .catch((err) => {
      if (err[0])
        res
          .writeHead(err[0], { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: err[1] }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

const deleteUser = async (
  req: Request<ISessionRequest>,
  res: Response<any>
): Promise<void> => {
  const token = (req.headers.authorization || "").split(" ")[1] || "";

  const { userUid } = req.body;

  if (!token || !userUid) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: token or name or password or userRole not found",
      })
    );
    return;
  }

  await sessionService
    .deleteUser(token, userUid)
    .then((result) => {
      res
        .writeHead(204, {
          "Content-Type": "application/json",
          // UID: result,
        })
        .end();
    })
    .catch((err) => {
      if (err[0])
        res
          .writeHead(err[0], { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: err[1] }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

export default {
  getUserToken,
  verifyToken,
  getAllUsers,
  createUser,
  deleteUser,
};
