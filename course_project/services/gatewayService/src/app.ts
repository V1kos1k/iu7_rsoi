import express from "express";
import cors from "cors";

import gatewayController from "./controller/gateway";
import { tokenMiddleware } from "./middleware/tokenMiddleware";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(tokenMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep" });
});

// пользователи
// получение списка всех пользователей (админ)
app.get("/api/v1/gateway/users", gatewayController.getUsers);
// добавление нового пользователя (админ)
app.post("/api/v1/gateway/users", gatewayController.createUser);

// самолеты
// получение списка самолетов (админ)
app.get("/api/v1/gateway/plane", gatewayController.getAllPlanes);
// добавление самолета (админ)
app.post("/api/v1/gateway/plane", gatewayController.createPlane);

// рейсы
// получение списка рейсов
app.get("/api/v1/gateway/flight", gatewayController.getAllFlights);
// получение конкретного рейса (когда открывается карточка рейса со свободными местами)
app.get("/api/v1/gateway/flight/:flightUid", gatewayController.getFlight);

// добавление рейса (админ)
app.post("/api/v1/gateway/flight", gatewayController.addFlight);
// изменение информации о рейсе по flightUid (админ)
app.patch("/api/v1/gateway/flight/:flightUid", gatewayController.updateFlight);
// удаление рейса по flightUid (админ)
app.delete("/api/v1/gateway/flight/:flightUid", gatewayController.deleteFlight);

//
// покупка билета
app.post("/api/v1/gateway/ticket/:flightUid", gatewayController.buyTicket);
// возврат билета
app.delete(
  "/api/v1/gateway/ticket/:flightUid/:ticketUid",
  gatewayController.deleteTicket
);
// получение информации по билету
app.get("/api/v1/gateway/ticket/:ticketUid", gatewayController.getTicket);
// получение списка купленных билетов конкретного пользователя
app.get("/api/v1/gateway/ticket", gatewayController.getUserTickets);
// получение информации о пользователе (просмотр баланса бонусов пользователя)
app.get("/api/v1/gateway/users/user", gatewayController.getUser);
// TODO просмотр статистики (админ) тут можен быть 2 запроса на каждую статистику
app.get("/api/v1/gateway/statistics", gatewayController.getStatistics);
