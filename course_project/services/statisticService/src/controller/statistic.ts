import { Request, Response } from "express";

import { IErrorResponse } from "../interface/ErrorResponse";

import statisticService from "../service/statistic";

const getNumberOfTicketsPurchased = async (
  req: Request<any>,
  res: Response<number | IErrorResponse | any>
): Promise<void> => {
  await statisticService
    .getNumberOfTicketsPurchased()
    .then((result) => {
      res
        .writeHead(200, { "Content-Type": "application/json" })
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

const getNumberOfTicketsPurchasedForTheFlight = async (
  req: Request<any>,
  res: Response<number | IErrorResponse | any>
): Promise<void> => {
  await statisticService
    .getNumberOfTicketsPurchasedForTheFlight()
    .then((result) => {
      res
        .writeHead(200, { "Content-Type": "application/json" })
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

export default {
  getNumberOfTicketsPurchased,
  getNumberOfTicketsPurchasedForTheFlight,
};
