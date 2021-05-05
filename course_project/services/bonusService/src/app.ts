import express from "express";
import cors from "cors";

import bonusController from "./controller/bonus";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep" });
});

app.get("/api/v1/miles/:userUid", bonusController.getBonusStatus);
app.post("/api/v1/miles/:userUid/add", bonusController.addBonus);
app.post("/api/v1/miles/:userUid/reduce", bonusController.reduceBonus);
// для админа при создании пользователя
app.post("/api/v1/miles/:userUid/create", bonusController.createBonus);
