import { IWarrantyRequest } from '../interface/WarrantyRequest';
import {
  IWarrantyResponse,
  IWarrantyResponseBody,
} from '../interface/WarrantyResponse';

import warrantyRepository from '../repository/warranty';

const getWarrantyStatus = async (
  itemUid: string
): Promise<IWarrantyResponseBody | number> => {
  return warrantyRepository
    .getWarrantyStatus(itemUid)
    .then((result) => {
      if (!result) return 0;
      else return result;
    })
    .catch((err) => {
      throw err;
    });
};

const startWarrantyPeriod = async (itemUid: string): Promise<boolean> => {
  return warrantyRepository
    .startWarrantyPeriod(itemUid)
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

const deleteWarrantyStatus = async (itemUid: string): Promise<number> => {
  return warrantyRepository
    .deleteWarrantyStatus(itemUid)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

const warrantyDecision = async (
  itemUid: string,
  body: IWarrantyRequest
): Promise<IWarrantyResponse | number | any> => {
  return warrantyRepository
    .getWarrantyStatus(itemUid)
    .then((result) => {
      let decision = '';
      if (!result) return 0;
      else if (result.status != 'ON_WARRANTY') {
        decision = 'REFUSED';
      } else {
        if (body.availableCount > 0) decision = 'RETURN';
        else decision = 'FIXING';
      }

      return { decision, warrantyDate: result.warrantyDate };
    })
    .catch((err) => {
      throw err;
    });
};

export default {
  getWarrantyStatus,
  startWarrantyPeriod,
  deleteWarrantyStatus,
  warrantyDecision,
};
