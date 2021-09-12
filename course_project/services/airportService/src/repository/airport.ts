import { pool } from "../configDb";

import {
  IAirportInfoResponse,
  IAirportInfoResponseDB,
} from "../interface/AirportResponse";

const getAllAirports = async (): Promise<IAirportInfoResponse[] | number> => {
  return await pool
    .query(`select * from airport`)
    .then((result) => {
      if (result.rowCount == 0) return 0;

      const resultArray = result.rows.map((item: IAirportInfoResponseDB) => {
        return {
          airportUid: item.airport_uid,
          airportName: item.airport_name,
          airportCode: item.airport_code,
          airportLocation: item.airport_location,
          airportAddress: item.airport_address,
          airportWebadress: item.airport_webadress,
          airportInfo: item.airport_info,
        };
      });
      return resultArray;
    })
    .catch((err) => {
      console.log("getAllAirports", err);
      throw err;
    });
};

const getAirport = async (
  airportUid: string
): Promise<IAirportInfoResponse | number> => {
  return await pool
    .query(`select * from airport where airport_uid='${airportUid}'`)
    .then((result) => {
      if (result.rowCount == 0) return 0;

      return {
        airportUid: result.rows[0].airport_uid,
        airportName: result.rows[0].airport_name,
        airportCode: result.rows[0].airport_code,
        airportLocation: result.rows[0].airport_location,
        airportAddress: result.rows[0].airport_address,
        airportWebadress: result.rows[0].airport_webadress,
        airportInfo: result.rows[0].airport_info,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const addAirport = async (
  airportUid: string,
  airportName: string,
  airportCode: string,
  airportLocation: string,
  airportAddress: string,
  airportWebadress: string,
  airportInfo: string
): Promise<number> => {
  return await pool
    .query(
      `insert into airport (airport_uid, 
                            airport_name, 
                            airport_code,
                            airport_location, 
                            airport_address, 
                            airport_webadress, 
                            airport_info) values 
                            ('${airportUid}', 
                            '${airportName}', 
                            '${airportCode}',
                            '${airportLocation}', 
                            '${airportAddress}', 
                            '${airportWebadress}', 
                            '${airportInfo}')  RETURNING id`
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAirport = async (airportUid: string): Promise<number> => {
  return await pool
    .query(`delete from airport where airport_uid='${airportUid}'`)
    .then((result) => {
      return result.rowCount;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getAllAirports,
  getAirport,
  addAirport,
  deleteAirport,
};
