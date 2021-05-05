import express from "express";
import cors from "cors";

import airportController from "./controller/airport";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep airport" });
});

app.get("/api/v1/airport", airportController.getAllAirports);
app.get("/api/v1/airport/:airportUid", airportController.getAirport);
// для админа при создании пользователя
app.post("/api/v1/airport", airportController.addAirport);
app.delete("/api/v1/airport/:airportUid", airportController.deleteAirport);
