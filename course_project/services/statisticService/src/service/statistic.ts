import statisticRepository from "../repository/statistic";

const getNumberOfTicketsPurchased = async (): Promise<any> => {
  return statisticRepository
    .getNumberOfTicketsPurchased()
    .then((result) => {
      if (!result) throw [404, "Информация не найдена"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const getNumberOfTicketsPurchasedForTheFlight = async (): Promise<any> => {
  return statisticRepository
    .getNumberOfTicketsPurchasedForTheFlight()
    .then((result) => {
      if (!result) throw [404, "Информация не найдена"];
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getNumberOfTicketsPurchased,
  getNumberOfTicketsPurchasedForTheFlight,
};
