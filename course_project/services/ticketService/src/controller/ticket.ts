import { Request, Response } from "express";

import { IErrorResponse } from "../interface/ErrorResponse";
import {
  ITicketCreateRequestParamter,
  ITicketRequestBody,
  ITicketRequestParamter,
} from "../interface/TicketRequest";

import ticketService from "../service/ticket";
import { ITicketInfoResponse } from "../interface/TicketResponse";

import validator from "validator";

const getTicket = async (
  req: Request<ITicketRequestParamter>,
  res: Response<number | IErrorResponse | ITicketInfoResponse>
): Promise<void> => {
  const { userUid, ticketUid } = req.params;

  if (!validator.isUUID(userUid) || !validator.isUUID(ticketUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid or ticketUid must be number",
      })
    );
    return;
  }

  await ticketService
    .getTicket(userUid, ticketUid)
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

const getAllUserTicket = async (
  req: Request<ITicketRequestParamter>,
  res: Response<number | IErrorResponse | ITicketInfoResponse>
): Promise<void> => {
  const { userUid } = req.params;

  if (!validator.isUUID(userUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid must be number",
      })
    );
    return;
  }

  await ticketService
    .getAllUserTicket(userUid)
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

const getAllTicket = async (
  req: Request<void>,
  res: Response<number | IErrorResponse | ITicketInfoResponse>
): Promise<void> => {
  await ticketService
    .getAllTicket()
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

const createTicket = async (
  req: Request<ITicketCreateRequestParamter & ITicketRequestBody>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { userUid, flightUid } = req.params;

  const { seatNo } = req.body;

  if (!seatNo || !validator.isUUID(userUid) || !validator.isUUID(flightUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: invalid seatNo or userUid or flightUid must be number",
      })
    );
    return;
  }

  await ticketService
    .createTicket({ userUid, flightUid, seatNo })
    .then((result) => {
      res
        .writeHead(201, { "Content-Type": "application/json" })
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

const deleteTicket = async (
  req: Request<ITicketRequestParamter>,
  res: Response<number | IErrorResponse | ITicketInfoResponse>
): Promise<void> => {
  const { userUid, ticketUid } = req.params;

  if (!validator.isUUID(userUid) || !validator.isUUID(ticketUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid userUid or ticketUid must be number",
      })
    );
    return;
  }

  await ticketService
    .deleteTicket(userUid, ticketUid)
    .then(() => {
      res.writeHead(204, { "Content-Type": "application/json" }).end();
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
  getTicket,
  getAllUserTicket,
  getAllTicket,
  createTicket,
  deleteTicket,
};
