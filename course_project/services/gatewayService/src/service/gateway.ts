import fetch from "node-fetch";
import { configinfo } from "../config";

const getUsers = async (): Promise<any> => {
  const response = await fetch(configinfo.serverHostSession.users, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) throw [422, "Ошибка другого сервиса"];
  return await response.json();
};

const getUser = async (userUid: string): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostBonus.bonus}/${userUid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) return await response.json();
  else if (response.status === 404) throw [404, "Пользователь не найден"];
  else throw [422, "Ошибка другого сервиса"];
};

const createUser = async (body: any): Promise<any> => {
  const response = await fetch(configinfo.serverHostSession.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status === 201) {
    const responseSession = await response.json();
    await fetch(
      `${configinfo.serverHostBonus.bonus}/${responseSession.userUid}/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "ok";
  } else if (response.status === 409) throw [409, "Логин занят"];
  else throw [422, "Ошибка другого сервиса"];
};

const getAirports = async (): Promise<any> => {
  const response = await fetch(configinfo.serverHostAirport.airport, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) return await response.json();
  else if (response.status == 404) throw [404, "Аэропорты не найдены"];
  else throw [422, "Ошибка другого сервиса"];
};

const getAllPlanes = async (): Promise<any> => {
  const response = await fetch(configinfo.serverHostFlight.planes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) return await response.json();
  else if (response.status == 404) throw [404, "Самолеты не найдены"];
  else throw [422, "Ошибка другого сервиса"];
};

const createPlane = async (body: any): Promise<any> => {
  const response = await fetch(configinfo.serverHostFlight.addPlane, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(response);
  if (response.status === 201) return "ok";
  else if (response.status === 409) throw [409, "Код самолета занят"];
  else throw [422, "Ошибка другого сервиса"];
};

const getAllFlights = async (): Promise<any> => {
  let response: any = await fetch(configinfo.serverHostFlight.flight, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return processArrayAirportsFlights(await response.json());
  } else if (response.status == 404) throw [404, "Рейсы не найдены"];
  else throw [422, "Ошибка другого сервиса"];
};

const getFlight = async (flightUid: string): Promise<any> => {
  const responseFlight = await fetch(
    `${configinfo.serverHostFlight.flight}/${flightUid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (responseFlight.status === 200) {
    const responseData = await responseFlight.json();

    const responseSeats = await fetch(
      `${configinfo.serverHostFlight.seats}/${flightUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseAitportDeparture = await fetch(
      `${configinfo.serverHostAirport.airport}/${responseData.airportDepartureUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseAitportArrival = await fetch(
      `${configinfo.serverHostAirport.airport}/${responseData.airportArrivalUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseAitportDepartureData = await responseAitportDeparture.json();
    const responseAitportArrivalData = await responseAitportArrival.json();

    responseData.aitportDepartureData = responseAitportDepartureData;
    responseData.aitportArrivalData = responseAitportArrivalData;

    if (responseSeats.status === 200)
      return { flight: responseData, seats: await responseSeats.json() };
    else if (responseSeats.status === 404)
      return { flight: responseData, seats: [404, "Места не найдены"] };
  } else if (responseFlight.status == 404) throw [404, "Рейсы не найдены"];
  else throw [422, "Ошибка другого сервиса"];
};

const addFlight = async (body: any): Promise<any> => {
  const response = await fetch(configinfo.serverHostFlight.flight, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status === 201) return "ok";
  else if (response.status === 404) return [404, "Самолет не найден"];
  else throw [422, "Ошибка другого сервиса"];
};

const updateFlight = async (flightUid: string, body: any): Promise<any> => {
  const response = await fetch(
    `${configinfo.serverHostFlight.flight}/${flightUid}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (response.status === 204) return "ok";
  else if (response.status === 409) throw [409, "Код самолета занят"];
  else throw [422, "Ошибка другого сервиса"];
};

const deleteFlight = async (flightUid: string): Promise<any> => {
  let response: any = { flight: [], ticket: [] };

  const responseFlight = await fetch(
    `${configinfo.serverHostFlight.flight}/${flightUid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (responseFlight.status === 204) response.flight = [204, "ok"];
  else if (responseFlight.status === 404)
    response.flight = [404, "Рейс не найден"];
  else response.flight = [422, "Ошибка другого сервиса"];

  const responseTicket = await fetch(
    `${configinfo.serverHostTicket.ticket}/${flightUid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (responseTicket.status === 204) response.ticket = [204, "ok"];
  else if (responseTicket.status === 404)
    response.ticket = [404, "Рейс не найден"];
  else response.ticket = [422, "Ошибка другого сервиса"];

  return response;
};

const buyTicket = async (
  userUid: string,
  flightUid: string,
  seatNo: string
): Promise<any> => {
  let response: any = { flight: [], ticket: [] };

  const responseFlight = await fetch(
    `${configinfo.serverHostFlight.seats}/${flightUid}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seatNo, seatStatus: "occupied" }),
    }
  );
  const responseFlightData = await responseFlight.json();
  if (responseFlight.status === 200)
    response.flight = [200, responseFlightData];
  else if (responseFlight.status === 404)
    response.flight = [404, responseFlightData];
  else if (responseFlight.status === 409) {
    response.flight = [409, responseFlightData];
    return response;
  } else {
    response.flight = [422, "Ошибка другого сервиса"];
    return response;
  }

  const responseTicket = await fetch(
    `${configinfo.serverHostTicket.userTiket}/${userUid}/${flightUid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seatNo }),
    }
  );
  if (responseTicket.status === 201)
    response.ticket = [201, await responseTicket.json()];
  else if (responseTicket.status === 409)
    response.ticket = [409, await responseTicket.json()];
  else response.ticket = [422, "Ошибка другого сервиса"];

  const responseFlightFull = await fetch(
    `${configinfo.serverHostFlight.flight}/${flightUid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (responseFlightFull.status === 200) {
    const responseFlightFullData = await responseFlightFull.json();
    const responseBonus = await fetch(
      `${configinfo.serverHostBonus.bonus}/${userUid}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ miles: responseFlightFullData.flightMiles }),
      }
    );
  }

  return response;
};

const deleteTicket = async (
  userUid: string,
  flightUid: string,
  ticketUid: string,
  seatNo: string
): Promise<any> => {
  let response: any = { flight: [], ticket: [] };
  const responseFlight = await fetch(
    `${configinfo.serverHostFlight.seats}/${flightUid}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seatNo, seatStatus: "free" }),
    }
  );
  if (responseFlight.status === 200)
    response.flight = [200, await responseFlight.json()];
  else if (responseFlight.status === 404)
    response.flight = [404, await responseFlight.json()];
  else if (responseFlight.status === 409) {
    response.flight = [409, await responseFlight.json()];
    return response;
  } else {
    response.flight = [422, "Ошибка другого сервиса"];
    return response;
  }

  const responseTicket = await fetch(
    `${configinfo.serverHostTicket.userTiket}/${userUid}/${ticketUid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (responseTicket.status === 204) response.ticket = [204, "ok"];
  else if (responseTicket.status === 404)
    response.ticket = [404, await responseTicket.json()];
  else response.ticket = [422, "Ошибка другого сервиса"];

  return response;
};

const getTicket = async (userUid: string, ticketUid: string): Promise<any> => {
  let response: any = { flight: [], ticket: [] };

  const responseTicket = await fetch(
    `${configinfo.serverHostTicket.userTiket}/${userUid}/${ticketUid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const ticketData = await responseTicket.json();
  if (responseTicket.status === 200) {
    response.ticket = [200, ticketData];

    const responseFlight = await fetch(
      `${configinfo.serverHostFlight.flight}/${ticketData.flightUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (responseFlight.status === 200) {
      const responseData = await responseFlight.json();
      const responseAitportDeparture = await fetch(
        `${configinfo.serverHostAirport.airport}/${responseData.airportDepartureUid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseAitportArrival = await fetch(
        `${configinfo.serverHostAirport.airport}/${responseData.airportArrivalUid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseAitportDepartureData = await responseAitportDeparture.json();
      const responseAitportArrivalData = await responseAitportArrival.json();

      response.flight = [
        200,
        {
          ...responseData,
          aitportDepartureData: responseAitportDepartureData,
          aitportArrivalData: responseAitportArrivalData,
        },
      ];
    } else if (responseFlight.status === 404)
      response.flight = [404, await responseFlight.json()];
    else {
      response.flight = [422, "Ошибка другого сервиса"];
    }
  } else if (responseTicket.status === 404) response.ticket = [404, ticketData];
  else response.ticket = [422, "Ошибка другого сервиса"];

  return response;
};

const getUserTickets = async (userUid: string): Promise<any> => {
  let response: any = { ticket: [] };

  const responseTicket = await fetch(
    `${configinfo.serverHostTicket.userTiket}/${userUid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const ticketData = await responseTicket.json();
  if (responseTicket.status === 200) {
    response = await processArray(ticketData);
  } else if (responseTicket.status === 404) response.ticket = [404, ticketData];
  else response.ticket = [422, "Ошибка другого сервиса"];

  return response;
};

async function processArray(arr: any) {
  let result: any = { ticket: [] };

  for (let i = 0; i < arr.length; i++) {
    const response = await fetch(
      `${configinfo.serverHostFlight.flight}/${arr[i].flightUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (response.status === 200) {
      const responseAitportDeparture = await fetch(
        `${configinfo.serverHostAirport.airport}/${responseData.airportDepartureUid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseAitportArrival = await fetch(
        `${configinfo.serverHostAirport.airport}/${responseData.airportArrivalUid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseAitportDepartureData = await responseAitportDeparture.json();
      const responseAitportArrivalData = await responseAitportArrival.json();
      result.ticket.push({
        ...arr[i],
        flight: {
          status: response.status,
          aitportDepartureData: responseAitportDepartureData,
          aitportArrivalData: responseAitportArrivalData,
          ...responseData,
        },
      });
    } else {
      result.ticket.push([
        response.status,
        {
          ...arr[i],
          flight: {
            status: response.status,
            ...responseData,
          },
        },
      ]);
    }

    if (i === arr.length - 1) return result;
  }
}

async function processArrayAirportsFlights(arr: any) {
  let result: any = { flight: [] };

  for (let i = 0; i < arr.length; i++) {
    const responseAitportDeparture = await fetch(
      `${configinfo.serverHostAirport.airport}/${arr[i].airportDepartureUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseAitportArrival = await fetch(
      `${configinfo.serverHostAirport.airport}/${arr[i].airportArrivalUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseAitportDepartureData = await responseAitportDeparture.json();
    const responseAitportArrivalData = await responseAitportArrival.json();
    result.flight.push({
      ...arr[i],
      aitportDepartureData: responseAitportDepartureData,
      aitportArrivalData: responseAitportArrivalData,
    });

    if (i === arr.length - 1) return result;
  }
}

const getStatistics = async (): Promise<any> => {
  const responseNumberOfTicketsPurchased = await fetch(
    configinfo.serverHostStatistics.numberOfTicketsPurchased,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseNumberOfTicketsPurchasedForTheFlight = await fetch(
    configinfo.serverHostStatistics.numberOfTicketsPurchasedForTheFlight,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (
    responseNumberOfTicketsPurchased.status !== 500 ||
    responseNumberOfTicketsPurchasedForTheFlight.status !== 500
  ) {
    return {
      responseNumberOfTicketsPurchased: [
        responseNumberOfTicketsPurchased.status,
        await responseNumberOfTicketsPurchased.json(),
      ],
      responseNumberOfTicketsPurchasedForTheFlight: [
        responseNumberOfTicketsPurchasedForTheFlight.status,
        await responseNumberOfTicketsPurchasedForTheFlight.json(),
      ],
    };
  } else throw [422, "Ошибка другого сервиса"];
};

export default {
  getUsers,
  getUser,
  createUser,
  getAllPlanes,
  createPlane,
  getAllFlights,
  getFlight,
  addFlight,
  updateFlight,
  deleteFlight,
  buyTicket,
  deleteTicket,
  getTicket,
  getUserTickets,
  getStatistics,
  getAirports,
};
