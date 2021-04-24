import express from 'express';
import cors from 'cors';

import warehouseController from './controller/warehouse';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});

app.get('/api/v1/warehouse/:orderItemUid', warehouseController.getItemInfo);
app.post('/api/v1/warehouse', warehouseController.takeItem);
app.post(
  '/api/v1/warehouse/:orderItemUid/warranty',
  warehouseController.warrantyRequest
);
app.delete('/api/v1/warehouse/:orderItemUid', warehouseController.returnItem);
