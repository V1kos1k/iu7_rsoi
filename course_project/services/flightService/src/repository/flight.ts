import {
  IFlightAllInfoRequest,
  IPlaneRequest,
  ISeatUpdate,
} from "../interface/FlightRequest";
import { pool } from "../configDb";

import {
  IFlightAllInfoResponse,
  IFlightInfoResponse,
  IFlightInfoResponseDB,
  IPlaneResponse,
  ISeatsResponse,
  ISeatsResponseDB,
} from "../interface/FlightResponse";

/**
 * Получает конкретный рейс
 * @returns {string} IFlightInfoResponseDB[]
 */
const getAllFlights = async (): Promise<IFlightInfoResponse[] | number> => {
  return await pool
    .query(`select * from flight`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      const resultArray: IFlightInfoResponse[] = result.rows.map(
        (item: IFlightInfoResponseDB) => {
          return {
            flightUid: item.flight_uid,
            flightNumber: item.flight_number,
            airportDepartureUid: item.airport_departure_uid,
            airportArrivalUid: item.airport_arrival_uid,
            flightTimestamp: item.flight_timestamp,
            flightDuration: item.flight_duration,
            flightMiles: Number(item.flight_miles),
            flightStatus: item.flight_status,
            flightFreeSeatsCount: item.flight_free_seats_count,
            price: item.price,
            planeCode: item.plane_code,
            airline: item.airline,
          };
        }
      );
      return resultArray;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Получает конкретный рейс
 * @returns {object | number} IFlightAllInfoResponse | number
 */
const getFlight = async (
  flightUid: string
): Promise<IFlightAllInfoResponse | number> => {
  return await pool
    .query(`select * from flight where flight_uid='${flightUid}'`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return {
        flightUid: result.rows[0].flight_uid,
        flightNumber: result.rows[0].flight_number,
        airportDepartureUid: result.rows[0].airport_departure_uid,
        airportArrivalUid: result.rows[0].airport_arrival_uid,
        flightTimestamp: result.rows[0].flight_timestamp,
        flightDuration: result.rows[0].flight_duration,
        flightMiles: Number(result.rows[0].flight_miles),
        flightStatus: result.rows[0].flight_status,
        flightFreeSeatsCount: result.rows[0].flight_free_seats_count,
        price: result.rows[0].price,
        planeCode: result.rows[0].plane_code,
        airline: result.rows[0].airline,
      };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Добавляет новый рейс
 */
const addFlight = async (props: IFlightAllInfoRequest) => {
  return await pool
    .query(
      `insert into flight (flight_uid, 
                          flight_number,
                          airport_departure_uid, 
                          airport_arrival_uid,
                          flight_timestamp,
                          flight_duration,
                          flight_miles, 
                          flight_status,
                          flight_free_seats_count,
                          price,
                          plane_code,
                          airline
        ) values (
                          '${props.flightUid}',
                          '${props.flightNumber}',
                          '${props.airportDepartureUid}',
                          '${props.airportArrivalUid}',
                          '${props.flightTimestamp}',
                          '${props.flightDuration}',
                          ${props.flightMiles},
                          'Выкл',
                          ${props.flightFreeSeatsCount},
                          ${props.price},
                          '${props.planeCode}',
                          '${props.airline}'
        ) RETURNING flight_uid`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Обновляет данные о рейсе
 * @returns {IFlightAllInfoRequest}
 */
const updateFlight = async (props: IFlightAllInfoRequest) => {
  return await pool
    .query(
      `update flight set airport_departure_uid='${props.airportDepartureUid}', 
                          airport_arrival_uid='${props.airportArrivalUid}',
                          flight_timestamp='${props.flightTimestamp}',
                          flight_duration='${props.flightDuration}',
                          flight_miles=${props.flightMiles},
                          flight_status='${props.flightStatus}'
      where flight_uid='${props.flightUid}'
      RETURNING flight_uid`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Обновляет количество мест на рейсе
 * @returns {string} flight_uid
 */
const updateFlightSeats = async (props: ISeatUpdate) => {
  return await pool
    .query(
      `update flight set flight_free_seats_count=flight_free_seats_count-'${
        props.seatStatus === "occupied" ? 1 : -1
      }'
      where flight_uid='${props.flightUid}'
      RETURNING flight_free_seats_count`
    )
    .then((result) => {
      return result.rows[0].flight_free_seats_count;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Удаление рейса
 */
const deleteFlight = async (flightUid: string) => {
  return await pool
    .query(`delete from flight where flight_uid='${flightUid}'`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Возвращает все существующие самолеты
 * @returns {array} IPlaneRequest[]
 */
const getAllPlane = async (): Promise<IPlaneResponse[] | number> => {
  return await pool
    .query(`select * from plane`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      const resultArray: IPlaneResponse[] = result.rows.map((item) => {
        return {
          planeCode: item.plane_code,
          planeModel: item.plane_model,
          planeRowCount: item.plane_row_count,
          planeColumnCount: item.plane_column_count,
          designationSeatsInRow: item.designation_seats_in_row,
          planeSeatsCount: item.plane_seats_count,
        };
      });
      return resultArray;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Возвращает конкретный самолет
 * @param planeCode
 * @returns {object} IPlaneRequest
 */
const getPlane = async (
  planeCode: string
): Promise<IPlaneResponse | number> => {
  return await pool
    .query(`select * from plane where plane_code='${planeCode}'`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      return {
        planeCode: result.rows[0].plane_code,
        planeModel: result.rows[0].plane_model,
        planeRowCount: result.rows[0].plane_row_count,
        planeColumnCount: result.rows[0].plane_column_count,
        designationSeatsInRow: result.rows[0].designation_seats_in_row,
        planeSeatsCount: result.rows[0].plane_seats_count,
      };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Добавляет новый самолет
 * @param props
 * @returns {number}
 */
const addPlane = async (props: IPlaneRequest) => {
  return await pool
    .query(
      `insert into plane (plane_code,
                          plane_model, 
                          plane_row_count, 
                          plane_column_count,
                          designation_seats_in_row, 
                          plane_seats_count)
      values ('${props.planeCode}',
              '${props.planeModel}', 
              '${props.planeRowCount}', 
              '${props.planeColumnCount}', 
              '${props.designationSeatsInRow}', 
              '${props.planeSeatsCount}')
      RETURNING plane_code`
    )
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Получает мест рейса
 * @returns {object | number} IFlightAllInfoResponse | number
 */
const getSeatsFlight = async (
  flightUid: string
): Promise<ISeatsResponse[] | number> => {
  return await pool
    .query(`select * from seats where flight_uid='${flightUid}'`)
    .then((result) => {
      if (result.rowCount === 0) return 0;

      const resultArray: ISeatsResponse[] = result.rows.map(
        (item: ISeatsResponseDB) => ({
          seatNo: item.seat_no,
          seatStatus: item.seat_status,
          flightUid: item.flight_uid,
          planeCode: item.plane_code,
        })
      );
      return resultArray;
    })
    .catch((err) => {
      throw err;
    });
};

const getSpecificSeatFlight = async (
  flightUid: string,
  seatNo: string
): Promise<string | number> => {
  return await pool
    .query(
      `select seat_status from seats where flight_uid='${flightUid}' and seat_no='${seatNo}'`
    )
    .then((result) => {
      if (result.rowCount === 0) return 0;
      return result.rows[0].seat_status;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Добавление мест на рейс
 */
const addSeats = async (props: string) => {
  return await pool
    .query(`${props} RETURNING flight_uid`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Обновляет состояние места
 * @param {ISeatUpdate}
 * @returns {string} seat_status
 */
const updateSeatFlight = async (props: ISeatUpdate) => {
  return await pool
    .query(
      `update seats set seat_status='${props.seatStatus}'
      where flight_uid='${props.flightUid}' and seat_no='${props.seatNo}'
      RETURNING seat_status`
    )
    .then((result) => {
      return result.rows[0].seat_status;
    })
    .catch((err) => {
      return err;
    });
};

/**
 * Удаление мест рейса
 */
const deleteSeatsFlight = async (flightUid: string) => {
  return await pool
    .query(`delete from seats where flight_uid='${flightUid}'`)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default {
  getAllFlights,
  getFlight,
  addFlight,
  updateFlight,
  updateFlightSeats,
  deleteFlight,

  getAllPlane,
  getPlane,
  addPlane,

  addSeats,
  getSeatsFlight,
  getSpecificSeatFlight,
  updateSeatFlight,
  deleteSeatsFlight,
};
