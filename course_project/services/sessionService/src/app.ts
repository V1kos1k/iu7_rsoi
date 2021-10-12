import express from "express";
import cors from "cors";

import sessionController from "./controller/session";

export const app = express();

const corsOptions = {
  exposedHeaders: ["Authorization", "role"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "sleep" });
});

app.get("/api/v1/session", sessionController.getUserToken);
app.get("/api/v1/session/verify", sessionController.verifyToken);
app.get("/api/v1/session/users", sessionController.getAllUsers);
app.post("/api/v1/session/create", sessionController.createUser);
app.delete("/api/v1/session", sessionController.deleteUser);
