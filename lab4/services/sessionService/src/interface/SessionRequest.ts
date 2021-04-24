export interface IStoreWarrantyRequest {
  reason: string;
}

export interface ICreatePurchaseRequest {
  model: string;
  size: string;
}

export interface IStoreRequestParameter {
  userUid: string;
}

export interface IStoreOrderRequestParameter {
  userUid: string;
  orderUid: string;
}
