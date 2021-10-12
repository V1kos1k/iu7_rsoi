// export const configinfo = {
//   serverHostService: "localhost",
//   serverPort: 8180,
//   databaseHost: "localhost",
//   databasePort: 5432,
//   databaseName: "bonusService",
//   databaseUser: "docker",
//   databasePassword: "docker",
// };

export const configinfo = {
  serverHostService: "localhost",
  databaseHost: "localhost",
  databasePort: 5432,
  databaseName: "gatewayService",
  databaseUser: "docker",
  databasePassword: "docker",
  serverPort: 8780,
  serverHostSession: {
    verify: "http://localhost:8580/api/v1/session/verify",
    users: "http://localhost:8580/api/v1/session/users",
    create: "http://localhost:8580/api/v1/session/create",
  },
  serverHostFlight: {
    flight: "http://localhost:8380/api/v1/flight",
    planes: "http://localhost:8380/api/v1/flight/planes",
    addPlane: "http://localhost:8380/api/v1/flight/addPlane",
    seats: "http://localhost:8380/api/v1/seats",
  },
  serverHostBonus: {
    bonus: "http://localhost:8180/api/v1/miles",
  },
  serverHostAirport: {
    airport: "http://localhost:8280/api/v1/airport",
  },
  serverHostTicket: {
    ticket: "http://localhost:8480/api/v1/ticket",
    userTiket: "http://localhost:8480/api/v1/ticket/user",
  },
  serverHostStatistics: {
    numberOfTicketsPurchased:
      "http://localhost:8680/api/v1/statistic/number-of-user-tickets",
    numberOfTicketsPurchasedForTheFlight:
      "http://localhost:8680/api/v1/statistic/number-of-flight-tickets",
  },
};
