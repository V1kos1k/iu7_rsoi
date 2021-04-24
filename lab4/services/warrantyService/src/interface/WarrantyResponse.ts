export interface IWarrantyResponse {
  warrantyDate: string;
  decision: string;
}

export interface IWarrantyResponseBody {
  itemUid: string;
  warrantyDate: string;
  status: string;
}
