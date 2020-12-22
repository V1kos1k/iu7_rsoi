export interface IItemInfoResponse {
  model: string;
  size: string;
}

export interface IOrderItemResponse {
  orderItemUid: string;
  orderUid: string;
  model: string;
  size: string;
}

export interface IOrderWarrantyResponse {
  warrantyDate: string;
  decision: string;
}
