import express from 'express';
import cors from 'cors';

import storeController from './controller/store';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});

app.get('/api/v1/store/:userUid/orders', storeController.getUserOrders);
app.get('/api/v1/store/:userUid/:orderUid', storeController.getUserOrder);
app.post('/api/v1/store/:userUid/purchase', storeController.makePurchase);
app.post(
  '/api/v1/store/:userUid/:orderUid/warranty',
  storeController.warrantyRequest
);
app.delete(
  '/api/v1/store/:userUid/:orderUid/refund',
  storeController.refundOrder
);
