import { IAirportInfoResponse } from "../interface/AirportResponse";
import airportRepository from "../repository/airport";

const getAllAirports = async (): Promise<IAirportInfoResponse[] | number> => {
  return airportRepository
    .getAllAirports()
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getAirport = async (
  airportUid: string
): Promise<IAirportInfoResponse | number> => {
  return airportRepository
    .getAirport(airportUid)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const addAirport = async (
  airportUid: string,
  airportName: string,
  airportLocation: string,
  airportAddress: string,
  airportWebadress: string,
  airportInfo: string
): Promise<number> => {
  return airportRepository
    .addAirport(
      airportUid,
      airportName,
      airportLocation,
      airportAddress,
      airportWebadress,
      airportInfo
    )
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAirport = async (
  airportUid: string
): Promise<IAirportInfoResponse | number> => {
  return airportRepository
    .deleteAirport(airportUid)
    .then((result) => {
      if (!result) return 0;
      return result;
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
