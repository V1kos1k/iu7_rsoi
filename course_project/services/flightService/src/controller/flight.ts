import { Request, Response } from "express";

import { IErrorResponse } from "../interface/ErrorResponse";
import {
  IFlightInfoRequest,
  IFlightRequestParamter,
  IPlaneRequest,
  ISeatUpdate,
} from "../interface/FlightRequest";

import flightService from "../service/flight";
import {
  IFlightInfoResponse,
  ISeatsResponse,
} from "../interface/FlightResponse";

import validator from "validator";

const getAllFlights = async (
  req: Request<void>,
  res: Response<IErrorResponse>
): Promise<void> => {
  await flightService
    .getAllFlights()
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

const getFlight = async (
  req: Request<IFlightRequestParamter>,
  res: Response<number | IErrorResponse | IFlightInfoResponse>
): Promise<void> => {
  const { flightUid } = req.params;

  if (!validator.isUUID(flightUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid flightUid must be number",
      })
    );
    return;
  }

  await flightService
    .getFlight(flightUid)
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

const addFlight = async (
  req: Request<IFlightInfoRequest>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const {
    flightNumber,
    airportDepartureUid,
    airportArrivalUid,
    flightTimestamp,
    flightDuration,
    flightMiles,
    price,
    planeModel,
    airline,
  } = req.body;

  if (
    !String(flightNumber) ||
    !validator.isUUID(airportDepartureUid) ||
    !validator.isUUID(airportArrivalUid) ||
    !String(flightTimestamp) ||
    !String(flightDuration) ||
    !String(flightMiles) ||
    !Number(price) ||
    !String(planeModel) ||
    !String(airline)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: invalid airportDepartureUid or airportArrivalUid or flightTimestamp or flightDuration or flightMiles or price or planeModel or airline must be number",
      })
    );
    return;
  }

  await flightService
    .addFlight(req.body)
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

const updateFlight = async (
  req: Request<IFlightInfoRequest & IFlightRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { flightUid } = req.params;

  const {
    airportDepartureUid,
    airportArrivalUid,
    flightTimestamp,
    flightDuration,
    flightMiles,
    flightStatus,
  } = req.body;

  if (
    !validator.isUUID(flightUid) ||
    !String(airportDepartureUid) ||
    !String(airportArrivalUid) ||
    !String(flightTimestamp) ||
    !String(flightDuration) ||
    !String(flightMiles) ||
    !String(flightStatus)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: invalid flightUid or airportDepartureUid or airportArrivalUid or flightTimestamp or flightDuration or flightMiles or flightStatus must be number",
      })
    );
    return;
  }

  await flightService
    .updateFlight({ flightUid, ...req.body })
    .then(() => {
      res.writeHead(204, { "Content-Type": "application/json" }).end();
    })
    .catch((err) => {
      console.log(err);
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

const deleteFlight = async (
  req: Request<IFlightRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { flightUid } = req.params;

  if (!validator.isUUID(flightUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid flightUid",
      })
    );
    return;
  }

  await flightService
    .deleteFlight(flightUid)
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

const getAllPlane = async (
  req: Request<void>,
  res: Response<IErrorResponse>
): Promise<void> => {
  await flightService
    .getAllPlane()
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

const addPlane = async (
  req: Request<IPlaneRequest>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const {
    planeCode,
    planeModel,
    planeRowCount,
    planeColumnCount,
    designationSeatsInRow,
    planeSeatsCount,
  } = req.body;

  if (
    !String(planeCode) ||
    !String(planeModel) ||
    !String(planeRowCount) ||
    !String(planeColumnCount) ||
    !String(designationSeatsInRow) ||
    !String(planeSeatsCount)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: invalid planeCode or planeModel or planeRowCount or planeColumnCount or designationSeatsInRow or planeSeatsCount must be number",
      })
    );
    return;
  }

  await flightService
    .addPlane(req.body)
    .then(() => {
      res.writeHead(204, { "Content-Type": "application/json" }).end();
    })
    .catch((err) => {
      if (err === 404)
        res
          .writeHead(404, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "not found" }));
      else if (err === 409)
        res
          .writeHead(409, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "conflict" }));
      else
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
    });
};

const getSeatsFlight = async (
  req: Request<IFlightRequestParamter>,
  res: Response<number | IErrorResponse | ISeatsResponse>
): Promise<void> => {
  const { flightUid } = req.params;

  if (!validator.isUUID(flightUid)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid flightUid must be number",
      })
    );
    return;
  }

  await flightService
    .getSeatsFlight(flightUid)
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

const updateSeatFlight = async (
  req: Request<ISeatUpdate & IFlightRequestParamter>,
  res: Response<IErrorResponse>
): Promise<void> => {
  const { flightUid } = req.params;

  const { seatNo, seatStatus } = req.body;

  if (!validator.isUUID(flightUid) || !String(seatNo) || !String(seatStatus)) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: invalid flightUid or seatNo or seatStatus",
      })
    );
    return;
  }

  await flightService
    .updateSeatFlight({ flightUid, ...req.body })
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
  getAllFlights,
  getFlight,
  addFlight,
  updateFlight,
  deleteFlight,

  getAllPlane,
  addPlane,

  getSeatsFlight,
  updateSeatFlight,
};
