export interface IStatisticResponse {}

export interface IStatisticInfoResponse {
  ticketUid: string;
  flightUid: string;
  userUid: string;
  seatNo: string;
}

export interface IStatisticInfoResponseDB {
  user_uid: string;
  ticket_count: number;
}

export interface IStatisticInfoTicketsFlightResponseDB {
  flight_uid: string;
  ticket_count: number;
}
