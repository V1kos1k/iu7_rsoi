import express, { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

import { configinfo } from "../config";

const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").split(" ")[1] || "";

  const response = await fetch(configinfo.serverHostSession.verify, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401)
    res
      .writeHead(401, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "unauthorized" }));
  else if (response.status === 500)
    res
      .writeHead(500, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "internal server error" }));

  const uid = response.headers.get("UID");
  const role = response.headers.get("role");

  if (uid && role) {
    req.headers["UID"] = uid;
    req.headers["role"] = role;
  }

  next();
};

export { tokenMiddleware };
