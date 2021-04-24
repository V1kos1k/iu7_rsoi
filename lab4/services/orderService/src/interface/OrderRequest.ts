export interface IOrderWarrantyRequest {
  reason: string;
}

export interface IOrderWarrantyRequestParameter {
  orderUid: string;
}

export interface IUserOrdersParameter {
  userUid: string;
}

export interface IUserOrderParameter {
  userUid: string;
  orderUid: string;
}

export interface ICreateOrderRequest {
  model: string;
  size: string;
}
