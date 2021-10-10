import express from "express";
import cors from "cors";

import ticketController from "./controller/ticket";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep ticket" });
});

// TODO покупка билета
// хз как сделать, точнее как проверять может ли пользователь купить билет на рейс
// 1 вариант
// это будет обрабатываться на уровне гетэвай и до запроса на покупку билетов будет проверяться количество мест
// и заранее заниматься место в самолете
// и все 2го варианта у меня нет
app.post(
  "/api/v1/ticket/user/:userUid/:flightUid",
  ticketController.createTicket
);

// возврат билета
app.delete(
  "/api/v1/ticket/user/:userUid/:ticketUid",
  ticketController.deleteTicket
);

// удаление всех билетов рейса
app.delete("/api/v1/ticket/:flightUid", ticketController.deleteAllTicketFlight);

// получение информации о конкретном билете пользователя
app.get("/api/v1/ticket/user/:userUid/:ticketUid", ticketController.getTicket);
// получение списка билетов пользователя
app.get("/api/v1/ticket/user/:userUid", ticketController.getAllUserTicket);
// получение списка билетов для админа
app.get("/api/v1/ticket", ticketController.getAllTicket);
