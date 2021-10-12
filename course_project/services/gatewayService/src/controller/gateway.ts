import { Request, Response } from "express";

import gatewayService from "../service/gateway";

const getUsers = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined" && userRole !== "admin") {
    res
      .writeHead(403, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Нет права доступа" }));
  } else if (userUid !== "undefined")
    await gatewayService
      .getUsers()
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
          })
          .end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("(1)", err);

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

const getUser = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined")
    await gatewayService
      .getUser(userUid)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
          })
          .end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("(1)", err);

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
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const { name, password, userRole } = req.body;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!name || !password || !userRole)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: userUid or name or password or userRole not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined" && currentUserRole !== "admin") {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "Нет права доступа",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .createUser({ name, password, userRole })
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const getAirports = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined")
    await gatewayService
      .getAirports()
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const getAllPlanes = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined")
    await gatewayService
      .getAllPlanes()
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const createPlane = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const {
    planeCode,
    planeModel,
    planeRowCount,
    planeColumnCount,
    designationSeatsInRow,
    planeSeatsCount,
  } = req.body;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!planeCode ||
      !planeModel ||
      !planeRowCount ||
      !planeColumnCount ||
      !designationSeatsInRow ||
      !planeSeatsCount)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: planeCode or planeModel or planeRowCount or planeColumnCount or designationSeatsInRow or planeSeatsCount not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined" && currentUserRole !== "admin") {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "Нет права доступа",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .createPlane({
        planeCode,
        planeModel,
        planeRowCount,
        planeColumnCount,
        designationSeatsInRow,
        planeSeatsCount,
      })
      .then((result) => {
        res
          .writeHead(201, {
            "Content-Type": "application/json",
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

const getAllFlights = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined")
    await gatewayService
      .getAllFlights()
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const getFlight = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  const { flightUid } = req.params;

  if ((userUid !== "undefined" || userRole !== "undefined") && !flightUid) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: flightUid not found",
      })
    );
    return;
  } else if (userUid !== "undefined")
    await gatewayService
      .getFlight(flightUid)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const addFlight = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const {
    flightNumber,
    airportDepartureUid,
    airportArrivalUid,
    flightTimestamp,
    flightDuration,
    flightMiles,
    price,
    planeCode,
    airline,
  } = req.body;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!flightNumber ||
      !airportDepartureUid ||
      !airportArrivalUid ||
      !flightTimestamp ||
      !flightDuration ||
      !flightMiles ||
      !price ||
      !planeCode ||
      !airline)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: flightNumber or airportDepartureUid or airportArrivalUid or flightTimestamp or flightDuration or flightMiles or price or planeCode or airline not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined" && currentUserRole !== "admin") {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "Нет права доступа",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .addFlight({
        flightNumber,
        airportDepartureUid,
        airportArrivalUid,
        flightTimestamp,
        flightDuration,
        flightMiles,
        price,
        planeCode,
        airline,
      })
      .then((result) => {
        res
          .writeHead(201, {
            "Content-Type": "application/json",
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

const updateFlight = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

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
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!flightUid ||
      !airportDepartureUid ||
      !airportArrivalUid ||
      !flightTimestamp ||
      !flightDuration ||
      !flightMiles ||
      !flightStatus)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message:
          "bad request: flightUid or airportDepartureUid or airportArrivalUid or flightTimestamp or flightDuration or flightMiles or flightStatus not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined" && currentUserRole !== "admin") {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "Нет права доступа",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .updateFlight(flightUid, {
        airportDepartureUid,
        airportArrivalUid,
        flightTimestamp,
        flightDuration,
        flightMiles,
        flightStatus,
      })
      .then((result) => {
        res
          .writeHead(204, {
            "Content-Type": "application/json",
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

const deleteFlight = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const { flightUid } = req.params;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    !flightUid
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: flightUid not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined" && currentUserRole !== "admin") {
    res.writeHead(403, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "Нет права доступа",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .deleteFlight(flightUid)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
          })
          .end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(err);
        res
          .writeHead(500, { "Content-Type": "application/json" })
          .end(JSON.stringify({ message: "internal server error" }));
      });
};

const buyTicket = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const { flightUid } = req.params;

  const { seatNo } = req.body;

  console.log(currentUserUid, flightUid, seatNo);

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!flightUid || !seatNo)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: flightUid or seatNo not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .buyTicket(currentUserUid, flightUid, seatNo)
      .then((result) => {
        res
          .writeHead(201, {
            "Content-Type": "application/json",
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

const deleteTicket = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const { flightUid, ticketUid } = req.params;

  const { seatNo } = req.body;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    (!flightUid || !seatNo)
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: flightUid or seatNo not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .deleteTicket(currentUserUid, flightUid, ticketUid, seatNo)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const getTicket = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  const { ticketUid } = req.params;

  if (
    (currentUserUid !== "undefined" || currentUserRole !== "undefined") &&
    !ticketUid
  ) {
    res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: "bad request: ticketUid not found",
      })
    );
    return;
  } else if (currentUserUid !== "undefined")
    await gatewayService
      .getTicket(currentUserUid, ticketUid)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
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

const getUserTickets = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const currentUserUid = String(req.headers["UID"]);
  const currentUserRole = String(req.headers["role"]);

  if (currentUserUid !== "undefined")
    await gatewayService
      .getUserTickets(currentUserUid)
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
          })
          .end(JSON.stringify(result));
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

const getStatistics = async (
  req: Request<any>,
  res: Response<any>
): Promise<void> => {
  const userUid = String(req.headers["UID"]);
  const userRole = String(req.headers["role"]);

  if (userUid !== "undefined" && userRole !== "admin") {
    res
      .writeHead(403, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Нет права доступа" }));
  } else if (userUid !== "undefined")
    await gatewayService
      .getStatistics()
      .then((result) => {
        res
          .writeHead(200, {
            "Content-Type": "application/json",
          })
          .end(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("(1)", err);

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
  getUsers,
  getUser,
  createUser,
  getAllPlanes,
  createPlane,
  getAllFlights,
  getFlight,
  addFlight,
  updateFlight,
  deleteFlight,
  buyTicket,
  deleteTicket,
  getTicket,
  getUserTickets,
  getStatistics,
  getAirports,
};
