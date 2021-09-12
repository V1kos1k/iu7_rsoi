export interface IAirportResponse {}

export interface IAirportResponseBody {
  itemUid: string;
}

export interface IAirportInfoResponse {
  airportUid: string;
  airportName: string;
  airportCode: string;
  airportLocation: string;
  airportAddress: string;
  airportWebadress: string;
  airportInfo: string;
}

export interface IAirportInfoResponseDB {
  airport_uid: string;
  airport_name: string;
  airport_code: string;
  airport_location: string;
  airport_address: string;
  airport_webadress: string;
  airport_info: string;
}
