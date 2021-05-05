import { Request, Response } from "express";

import { IErrorResponse } from "../interface/ErrorResponse";
import { IBonusResponseBody } from "../interface/BonusResponse";
import { IBonusRequestParamter } from "../interface/BonusRequest";

import bonusService from "../service/bonus";

const getBonusStatus = async (
  req: Request<IBonusRequestParamter>,
  res: Response<number | IErrorResponse | IBonusResponseBody>
): Promise<void> => {
  const { userUid } = req.params;

  if (!String(userUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid, must be number",
      })
    );
    return;
  }

  await bonusService
    .getBonusStatus(userUid)
    .then((result) => {
      result !== 0
        ? res
            .writeHead(200, { "Content-Type": "application/json" })
            .end(JSON.stringify(result))
        : res
            .writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({ message: "not found" }));
    })
    .catch(() =>
      res
        .writeHead(500, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "internal server error" }))
    );
};

const addBonus = async (
  req: Request<IBonusRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { userUid } = req.params;
  const { body } = req;

  if (!String(userUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid, must be number",
      })
    );
    return;
  }

  if (!body.miles) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: miles not found",
      })
    );
    return;
  }

  await bonusService
    .addBonus(userUid, body.miles)
    .then((result) => {
      result !== 0
        ? res
            .writeHead(200, { "Content-Type": "application/json" })
            .end(JSON.stringify(result))
        : res
            .writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({ message: "not found" }));
    })
    .catch(() =>
      res
        .writeHead(500, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "internal server error" }))
    );
};

const reduceBonus = async (
  req: Request<IBonusRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { userUid } = req.params;
  const { body } = req;

  if (!String(userUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid, must be number",
      })
    );
    return;
  }

  if (!body.miles) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: miles not found",
      })
    );
    return;
  }

  await bonusService
    .reduceBonus(userUid, body.miles)
    .then((result) => {
      result !== 0
        ? res
            .writeHead(200, { "Content-Type": "application/json" })
            .end(JSON.stringify(result))
        : res
            .writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({ message: "not found" }));
    })
    .catch(() =>
      res
        .writeHead(500, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "internal server error" }))
    );
};

const createBonus = async (
  req: Request<IBonusRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { userUid } = req.params;

  if (!String(userUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid, must be number",
      })
    );
    return;
  }

  await bonusService
    .createBonus(userUid)
    .then((result) => {
      result !== 0
        ? res.writeHead(204, { "Content-Type": "application/json" }).end()
        : res
            .writeHead(404, { "Content-Type": "application/json" })
            .end(JSON.stringify({ message: "not found" }));
    })
    .catch(() =>
      res
        .writeHead(500, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "internal server error" }))
    );
};

export default {
  getBonusStatus,
  addBonus,
  reduceBonus,
  createBonus,
};
