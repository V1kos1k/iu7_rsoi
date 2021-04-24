import express from 'express';
import cors from 'cors';

import sessionController from './controller/session';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});

app.get('/api/v1/session', sessionController.getUserToken);
app.get('/api/v1/session/verify', sessionController.verifyToken);
