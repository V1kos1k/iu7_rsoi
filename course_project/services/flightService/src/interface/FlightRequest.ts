export interface IFlightRequest {}

export interface IFlightRequestParamter {
  flightUid: string;
}

export interface IFlightRequestBody {}

export interface IFlightInfoRequest {
  flightNumber: string;
  airportDepartureUid: string;
  airportArrivalUid: string;
  flightTimestamp: string;
  flightDuration: string;
  flightMiles: number;
  flightStatus: string;
  price: number;
  planeCode: string;
  airline: string;
}

export interface IFlightAllInfoRequest {
  flightUid: string;
  flightNumber: string;
  airportDepartureUid: string;
  airportArrivalUid: string;
  flightTimestamp: string;
  flightDuration: string;
  flightMiles: number;
  flightStatus: string;
  flightFreeSeatsCount: number;
  price: number;
  planeCode: string;
  airline: string;
}

export interface IPlaneRequest {
  planeCode: string;
  planeModel: string;
  planeRowCount: number;
  planeColumnCount: number;
  designationSeatsInRow: string;
  planeSeatsCount: number;
}

export interface ISeatsRequest {
  seatNo: string;
  seatStatus: string;
  flightUid: string;
  planeCode: string;
}

export interface ISeatUpdate {
  flightUid: string;
  seatNo: string;
  seatStatus: string;
}
