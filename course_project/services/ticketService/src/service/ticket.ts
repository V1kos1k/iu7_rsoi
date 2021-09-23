import { ITicketInfoRequest } from "../interface/TicketRequest";
import { v4 as uuidv4 } from "uuid";

import { ITicketInfoResponse } from "../interface/TicketResponse";
import ticketRepository from "../repository/ticket";

const getAllUserTicket = async (
  userUid: string
): Promise<ITicketInfoResponse[] | number> => {
  return ticketRepository
    .getAllUserTicket(userUid)
    .then((result) => {
      if (!result) throw [404, "Билет не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getTicket = async (
  userUid: string,
  ticketUid: string
): Promise<ITicketInfoResponse | number> => {
  return ticketRepository
    .getTicket(userUid, ticketUid)
    .then((result) => {
      if (!result) throw [404, "Билет не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getAllTicket = async (): Promise<ITicketInfoResponse[] | number> => {
  return ticketRepository
    .getAllTicket()
    .then((result) => {
      if (!result) throw [404, "Билет не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const createTicket = async (
  body: ITicketInfoRequest
): Promise<ITicketInfoResponse | number> => {
  const ticketUid = uuidv4();
  return ticketRepository
    .createTicket({ ...body, ticketUid })
    .then((result) => {
      if (!result) throw [409, "Действие недоступно пользователю"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteTicket = async (
  userUid: string,
  ticketUid: string
): Promise<number> => {
  return ticketRepository
    .deleteTicket(userUid, ticketUid)
    .then((result) => {
      if (!result) throw [404, "Билет не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getAllUserTicket,
  getTicket,
  getAllTicket,
  createTicket,
  deleteTicket,
};
