export interface ITicketResponse {}

export interface ITicketResponseBody {
  ticketUid: string;
}

export interface ITicketInfoResponse {
  ticketUid: string;
  flightUid: string;
  userUid: string;
  seatNo: string;
}

export interface ITicketAllInfoResponse {}

export interface ITicketInfoResponseDB {
  ticket_uid: string;
  flight_uid: string;
  user_uid: string;
  seat_no: string;
}
