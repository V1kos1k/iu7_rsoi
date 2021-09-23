export interface ITicketRequest {}

export interface ITicketRequestParamter {
  userUid: string;
  ticketUid: string;
}

export interface ITicketCreateRequestParamter {
  userUid: string;
  flightUid: string;
}

export interface ITicketRequestBody {
  seatNo: string;
}

export interface ITicketInfoRequest {
  userUid: string;
  flightUid: string;
  seatNo: string;
}

export interface ITicketAllInfoRequest {
  userUid: string;
  ticketUid: string;
  flightUid: string;
  seatNo: string;
}
