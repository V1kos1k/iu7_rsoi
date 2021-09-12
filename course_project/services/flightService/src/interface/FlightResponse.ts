export interface IFlightResponse {}

export type seatStatus = "free" | "occupied";

export interface IFlightResponseBody {
  flightUid: string;
}

export interface IFlightInfoResponse {
  flightUid: string;
  flightNumber: string;
  airportDepartureUid: string;
  airportArrivalUid: string;
  flightTimestamp: string;
  flightDuration: string;
  flightMiles: number;
  flightStatus: string;
  flightFreeSeatsCount: number;
  planeCode: string;
  airline: string;
}

export interface IFlightAllInfoResponse {
  flightUid: string;
  flightNumber: string;
  airportDepartureUid: string;
  airportArrivalUid: string;
  flightTimestamp: string;
  flightDuration: string;
  flightMiles: number;
  flightStatus: string;
  flightFreeSeatsCount: number;
  planeCode: string;
  airline: string;
}

export interface IFlightInfoResponseDB {
  flight_uid: string;
  flight_number: string;
  airport_departure_uid: string;
  airport_arrival_uid: string;
  flight_timestamp: string;
  flight_duration: string;
  flight_miles: string;
  flight_status: string;
  flight_free_seats_count: number;
  plane_code: string;
  airline: string;
}

export interface IPlaneResponse {
  planeCode: string;
  planeModel: string;
  planeRowCount: number;
  planeColumnCount: number;
  designationSeatsInRow: string;
  planeSeatsCount: number;
}

export interface IPlaneResponseDB {
  plane_code: string;
  plane_model: string;
  plane_row_count: number;
  plane_column_count: number;
  designation_seats_in_row: number;
  plane_seats_count: number;
}

export interface ISeatsResponse {
  seatNo: string;
  seatStatus: seatStatus;
  flightUid: string;
  planeCode: string;
}

export interface ISeatsResponseDB {
  seat_no: string;
  seat_status: seatStatus;
  flight_uid: string;
  plane_code: string;
}
