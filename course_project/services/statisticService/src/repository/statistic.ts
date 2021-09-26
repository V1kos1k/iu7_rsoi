import {
  IStatisticInfoResponse,
  IStatisticInfoResponseDB,
  IStatisticInfoTicketsFlightResponseDB,
} from "../interface/StatisticResponse";
import { pool } from "../configDb";

/**
 * Получает количество купленных каждым пользователем билетов
 * @returns IStatisticInfoResponseDB[]
 */
const getNumberOfTicketsPurchased = async (): Promise<any> => {
  return await pool
    .query(
      `select user_uid, count(ticket_uid) as ticket_count from statistic group by user_uid`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return result.rows.map((item: IStatisticInfoResponseDB) => ({
        userUid: item.user_uid,
        ticketCount: item.ticket_count,
      }));
    })
    .catch((err) => {
      console.log(err);

      throw err;
    });
};

/**
 * Получает количество купленных билетов на рейс
 * @returns IStatisticInfoTicketsFlightResponseDB[]
 */
const getNumberOfTicketsPurchasedForTheFlight = async (): Promise<any> => {
  return await pool
    .query(
      `select flight_uid, count(ticket_uid) as ticket_count from statistic group by flight_uid`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return result.rows.map((item: IStatisticInfoTicketsFlightResponseDB) => ({
        flightUid: item.flight_uid,
        ticketCount: item.ticket_count,
      }));
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Записывает новые данные из очереди
 * @param data IStatisticInfoResponse
 * @returns IStatisticInfoRequest
 */
const recordingData = async (data: IStatisticInfoResponse) => {
  return await pool
    .query(
      `insert into statistic (ticket_uid, flight_uid, user_uid) 
        values ('${data.ticketUid}', '${data.flightUid}', '${data.userUid}')  RETURNING *`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return {
        ticketUid: result.rows[0].ticket_uid,
        flightUid: result.rows[0].flight_uid,
        userUid: result.rows[0].user_uid,
      };
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default {
  getNumberOfTicketsPurchased,
  getNumberOfTicketsPurchasedForTheFlight,
  recordingData,
};
