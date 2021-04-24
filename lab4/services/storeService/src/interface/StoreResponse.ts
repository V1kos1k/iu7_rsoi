export interface IUserOrderResponse {
  orderUid: string;
  date: string | undefined;
  model: string | undefined;
  size: string | undefined;
  warrantyDate: string | undefined;
  warrantyStatus: string | undefined;
}

export interface IWarrantyResponse {
  orderUid: string;
  warrantyDate: string;
  decision: string;
}
