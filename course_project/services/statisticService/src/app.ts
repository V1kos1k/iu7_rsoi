import express from "express";
import cors from "cors";

import statisticController from "./controller/statistic";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep ticket" });
});

// получить количество купленных каждым пользователем билетов
app.get(
  "/api/v1/statistic/number-of-user-tickets",
  statisticController.getNumberOfTicketsPurchased
);

// получить количество купленных билетов на каждый рейс
app.get(
  "/api/v1/statistic/number-of-flight-tickets",
  statisticController.getNumberOfTicketsPurchasedForTheFlight
);
