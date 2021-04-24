export interface IUserOrderResponse {
  orderUid: string;
  date: string;
  model: string;
  size: string;
  warrantyDate: string;
  warrantyStatus: string;
}

export interface IWarrantyResponse {
  orderUid: string;
  warrantyDate: string;
  decision: string;
}
