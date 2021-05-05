import { IBonusResponseBody } from "../interface/BonusResponse";
import bonusRepository from "../repository/bonus";

const getBonusStatus = async (
  userUid: string
): Promise<number | IBonusResponseBody> => {
  return bonusRepository
    .getBonusStatus(userUid)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const addBonus = async (userUid: string, miles: number): Promise<any> => {
  return bonusRepository
    .addBonus(userUid, miles)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const reduceBonus = async (userUid: string, miles: number): Promise<any> => {
  return bonusRepository
    .getBonusStatus(userUid)
    .then((result) => {
      if (!result) return 0;

      // если хотят снять больше, чем есть на балансе
      if (result.balance < miles)
        return bonusRepository.reduceBonus(userUid, result.balance);
      else return bonusRepository.reduceBonus(userUid, miles);
    })
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const createBonus = async (userUid: string): Promise<any> => {
  return bonusRepository
    .createBonus(userUid)
    .then((result) => {
      if (!result) return 0;
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getBonusStatus,
  addBonus,
  reduceBonus,
  createBonus,
};
