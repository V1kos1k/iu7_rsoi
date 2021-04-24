import express from 'express';
import cors from 'cors';

import orderController from './controller/order';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});

app.get('/api/v1/orders/:userUid', orderController.getUserOrders);
app.get('/api/v1/orders/:userUid/:orderUid', orderController.getUserOrder);
app.post('/api/v1/orders/:userUid', orderController.createOrder);
app.post('/api/v1/orders/:orderUid/warranty', orderController.warrantyRequest);
app.delete('/api/v1/orders/:orderUid', orderController.refundOrder);
