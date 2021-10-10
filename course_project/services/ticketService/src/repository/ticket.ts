import { ITicketAllInfoRequest } from "../interface/TicketRequest";
import { pool } from "../configDb";

import { ITicketInfoResponse } from "../interface/TicketResponse";

/**
 * Получает все существующие билеты
 * @returns {object | number} IFlightAllInfoResponse | number
 */
const getAllTicket = async (): Promise<ITicketInfoResponse[] | number> => {
  return await pool
    .query(`select * from ticket`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      const resultArray: ITicketInfoResponse[] = result.rows.map((item) => ({
        ticketUid: item.ticket_uid,
        flightUid: item.flight_uid,
        userUid: item.user_uid,
        seatNo: item.seat_no,
      }));
      return resultArray;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Получает конкретный билет пользователя
 * @returns {object | number} IFlightAllInfoResponse | number
 */
const getTicket = async (
  userUid: string,
  ticketUid: string
): Promise<ITicketInfoResponse | number> => {
  return await pool
    .query(
      `select * from ticket where user_uid='${userUid}' and 
                                  ticket_uid='${ticketUid}'`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return {
        ticketUid: result.rows[0].ticket_uid,
        flightUid: result.rows[0].flight_uid,
        userUid: result.rows[0].user_uid,
        seatNo: result.rows[0].seat_no,
      };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Получает все билеты пользователя
 * @returns {object | number} IFlightAllInfoResponse[] | number
 */
const getAllUserTicket = async (
  userUid: string
): Promise<ITicketInfoResponse[] | number> => {
  return await pool
    .query(`select * from ticket where user_uid='${userUid}'`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      const resultArray: ITicketInfoResponse[] = result.rows.map((item) => ({
        ticketUid: item.ticket_uid,
        flightUid: item.flight_uid,
        userUid: item.user_uid,
        seatNo: item.seat_no,
      }));
      return resultArray;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Создает новый билет у пользователя (покупка)
 * @param {ITicketAllInfoRequest}
 * @returns {ITicketInfoResponse}
 */
const createTicket = async (
  body: ITicketAllInfoRequest
): Promise<ITicketInfoResponse | number> => {
  const { userUid, flightUid, ticketUid, seatNo } = body;
  return await pool
    .query(
      `insert into ticket (user_uid,
                            flight_uid,
                            ticket_uid,
                            seat_no
        ) values (
          '${userUid}',
          '${flightUid}',
          '${ticketUid}',
          '${seatNo}'
        ) RETURNING *`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return {
        ticketUid: result.rows[0].ticket_uid,
        flightUid: result.rows[0].flight_uid,
        userUid: result.rows[0].user_uid,
        seatNo: result.rows[0].seat_no,
      };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Удаление билета (возврат)
 */
const deleteTicket = async (
  userUid: string,
  ticketUid: string
): Promise<number> => {
  return await pool
    .query(
      `delete from ticket where user_uid='${userUid}' and
                                      ticket_uid='${ticketUid}'
                                      RETURNING ticket_uid`
    )
    .then((res) => {
      console.log(res.rowCount);
      return res.rowCount;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Удаление всех билетов на рейсе (удаление рейса)
 */
const deleteAllTicketFlight = async (flightUid: string): Promise<number> => {
  return await pool
    .query(
      `delete from ticket where flight_uid='${flightUid}' RETURNING flight_uid`
    )
    .then((res) => {
      console.log(res.rowCount);
      return res.rowCount;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default {
  getAllTicket,
  getTicket,
  getAllUserTicket,
  createTicket,
  deleteTicket,
  deleteAllTicketFlight,
};
