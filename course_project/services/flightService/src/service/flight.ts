import {
  IFlightAllInfoRequest,
  IFlightInfoRequest,
  IPlaneRequest,
  ISeatUpdate,
} from "../interface/FlightRequest";
import { v4 as uuidv4 } from "uuid";

import {
  IFlightInfoResponse,
  IPlaneResponse,
  ISeatsResponse,
} from "../interface/FlightResponse";
import flightRepository from "../repository/flight";

const getAllFlights = async (): Promise<IFlightInfoResponse[] | number> => {
  return flightRepository
    .getAllFlights()
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getFlight = async (
  airportUid: string
): Promise<IFlightInfoResponse | number> => {
  return flightRepository
    .getFlight(airportUid)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const addFlight = async (props: IFlightInfoRequest) => {
  const flightUid = uuidv4();

  return flightRepository
    .getPlane(props.planeCode)
    .then((result) => {
      if (!(typeof result === "object")) throw [404, "Самолет не найден"];
      else
        return [
          flightRepository.addFlight({
            ...props,
            flightUid: flightUid,
            flightFreeSeatsCount: result.planeSeatsCount,
          }),
          result,
        ];
    })
    .then((result: any) => {
      if (!result[0]) throw [409, "Действие недоступно пользователю"];
      console.log("flightUid", result[0]);
      let values: string[] = [];
      for (let i = 1; i <= result[1].planeRowCount; i++) {
        const valuesRow = result[1].designationSeatsInRow
          .split("")
          .map((item: string) => {
            return `('${i}${item}', 'free', '${flightUid}', '${props.planeCode}')`;
          });
        values = values.concat(valuesRow);
      }
      const requestBody = "INSERT INTO seats (seat_no, seat_status, flight_uid, plane_code) VALUES ".concat(
        values.join(",")
      );
      return flightRepository.addSeats(requestBody);
    })
    .then((result) => {
      if (!result) throw [409, "Действие недоступно пользователю"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const updateFlight = async (props: IFlightAllInfoRequest) => {
  return flightRepository
    .updateFlight(props)
    .then((result) => {
      console.log(result);
      if (!result) throw [404, "Рейс не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteFlight = async (flightUid: string) => {
  // удалить места, удалить рейс
  return flightRepository
    .deleteSeatsFlight(flightUid)
    .then((result) => {
      if (!result) throw [404, "Рейс не найден"];
      return flightRepository.deleteFlight(flightUid);
    })
    .then((result) => {
      if (!result) throw [404, "Рейс не найден"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getAllPlane = async (): Promise<IPlaneResponse[] | number> => {
  return flightRepository
    .getAllPlane()
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const addPlane = async (props: IPlaneRequest) => {
  return flightRepository
    .getPlane(props.planeCode)
    .then((result) => {
      if (!result) return flightRepository.addPlane(props);
      throw 409;
    })
    .then((result) => {
      if (!result) return 0;
    })
    .catch((err) => {
      throw err;
    });
};

const getSeatsFlight = async (
  airportUid: string
): Promise<ISeatsResponse[] | number> => {
  return flightRepository
    .getSeatsFlight(airportUid)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const updateSeatFlight = async (
  props: ISeatUpdate
): Promise<string | number> => {
  // получение рейса, чтобы понять есть ли места
  return flightRepository
    .getFlight(props.flightUid)
    .then((result: any) => {
      if (!result) throw [404, "Рейс не найден"];
      // если хотят купить и нет свободных мест
      else if (
        props.seatStatus === "occupied" &&
        result.flightFreeSeatsCount < 1
      )
        throw [404, "Нет свободных мест, обновите страницу"];
      // получение текущего состояния места
      // чтобы нельзя было несколько раз занять это место
      // или несколько раз его освободить
      return flightRepository.getSpecificSeatFlight(
        props.flightUid,
        props.seatNo
      );
    })
    .then((result) => {
      if (!result) throw [404, "Место не найдено"];
      else if (result === props.seatStatus)
        throw [409, "Действие недоступно пользователю"];

      // изменение состояния текущего рейса
      return flightRepository.updateSeatFlight(props);
    })
    .then((result) => {
      if (!result) throw [404, "Обновление неудалось"];
      // изменение количества вободных мест на рейсе
      return flightRepository.updateFlightSeats(props);
    })
    .then((result) => {
      if (!result) throw [404, "Обновление неудалось"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getAllFlights,
  getFlight,
  addFlight,
  updateFlight,
  deleteFlight,

  getAllPlane,
  addPlane,

  getSeatsFlight,
  updateSeatFlight,
};
