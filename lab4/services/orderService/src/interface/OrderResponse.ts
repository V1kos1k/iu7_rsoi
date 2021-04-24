export interface ICreateOrderResponse {
  orderUid: string;
}

export interface IOrderInfoResponse {
  orderUid: string;
  orderDate: string;
  itemUid: string;
  status: string;
}

export interface IOrderInfoResponseDB {
  id: number;
  order_uid: string;
  order_date: string;
  item_uid: string;
  status: string;
}

export interface IOrderWarrantyResponse {
  warrantyDate: string;
  decision: string;
}
