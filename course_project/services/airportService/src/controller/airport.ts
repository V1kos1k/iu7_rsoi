import { Request, Response } from "express";

import { IErrorResponse } from "../interface/ErrorResponse";
import { IAirportRequestParamter } from "../interface/AirportRequest";

import airportService from "../service/airport";
import { IAirportInfoResponse } from "../interface/AirportResponse";

import validator from "validator";

const getAllAirports = async (
  req: Request<void>,
  res: Response<number | IErrorResponse | IAirportInfoResponse[]>
): Promise<void> => {
  await airportService
    .getAllAirports()
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

const getAirport = async (
  req: Request<IAirportRequestParamter>,
  res: Response<number | IErrorResponse | IAirportInfoResponse>
): Promise<void> => {
  const { airportUid } = req.params;

  if (!validator.isUUID(airportUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid airportUid must be number",
      })
    );
    return;
  }

  await airportService
    .getAirport(airportUid)
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

const addAirport = async (
  req: Request<void>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const {
    airportName,
    airportCode,
    airportLocation,
    airportAddress,
    airportWebadress,
    airportInfo,
  } = req.body;

  if (
    !String(airportName) ||
    !String(airportCode) ||
    !String(airportLocation) ||
    !String(airportAddress) ||
    !String(airportWebadress) ||
    !String(airportInfo)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: invalid airportUid or airportName or airportCode or airportLocation or airportAddress or airportWebadress or airportInfo must be number",
      })
    );
    return;
  }

  await airportService
    .addAirport(
      airportName,
      airportCode,
      airportLocation,
      airportAddress,
      airportWebadress,
      airportInfo
    )
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

const deleteAirport = async (
  req: Request<IAirportRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { airportUid } = req.params;

  if (!validator.isUUID(airportUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid airportUid must be number",
      })
    );
    return;
  }

  await airportService
    .deleteAirport(airportUid)
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
  getAllAirports,
  getAirport,
  addAirport,
  deleteAirport,
};
