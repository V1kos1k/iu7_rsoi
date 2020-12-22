import express from 'express';
import cors from 'cors';

import warrantyController from './controller/warranty';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});

app.get('/api/v1/warranty/:itemUid', warrantyController.getWarrantyStatus);
app.post('/api/v1/warranty/:itemUid', warrantyController.startWarrantyPeriod);
app.post(
  '/api/v1/warranty/:itemUid/warranty',
  warrantyController.warrantyDecision
);
app.delete(
  '/api/v1/warranty/:itemUid',
  warrantyController.deleteWarrantyStatus
);
