import express from "express";
import cors from "cors";

import flightController from "./controller/flight";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep flight" });
});

// самолеты
app.get("/api/v1/flight/planes", flightController.getAllPlane);
app.post("/api/v1/flight/addPlane", flightController.addPlane);

// рейсы
app.post("/api/v1/flight", flightController.addFlight);
app.patch("/api/v1/flight/:flightUid", flightController.updateFlight);
app.delete("/api/v1/flight/:flightUid", flightController.deleteFlight);

app.get("/api/v1/flight", flightController.getAllFlights);
app.get("/api/v1/flight/:flightUid", flightController.getFlight);

// места
app.get("/api/v1/seats/:flightUid", flightController.getSeatsFlight);
app.patch("/api/v1/seats/:flightUid", flightController.updateSeatFlight);
