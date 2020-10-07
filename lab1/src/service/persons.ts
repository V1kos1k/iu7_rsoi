import personsRepository from '../repository/persons';

import { IPersonsResponseBody } from '../interface/PersonResponse';
import { IPersonsRequestBody } from '../interface/PersonRequest';

const getPersons = async (): Promise<any | IPersonsResponseBody[]> => {
  return personsRepository.getPersons()
    .then(res => {
      if (res.length == 0) return false
      else return res;
    })
    .catch(err => {
      throw err
    });
};

const getPersonById = async (id: number): Promise<any | IPersonsResponseBody> => {
  return personsRepository.getPersonById(id)
    .then(res => {
      if (res)
        return res;
      else 
        return false;
    })
    .catch(err => {
      throw err
    });
};

const createPerson = async (body: IPersonsRequestBody): Promise<any> => {
  return personsRepository.createPerson(body)
    .then(res => res)
    .catch(err => {
      throw err;
    });
};

const deletePersonById = async (id: number): Promise<any | IPersonsResponseBody> => {
  return personsRepository.deletePersonById(id)
    .then(res => {
      if (res)
        return res;
      else 
        return false;
    })
    .catch(err => {
      throw err
    });
};

const updatePersonById = async (id: number, body: IPersonsRequestBody): Promise<any | IPersonsResponseBody> => {
  return personsRepository.updatePersonById(id, body)
  .then(res => {
    if (res)
      return res;
    else 
      return false;
  })
  .catch(err => {
    throw err
  });
};

export default {
  getPersons,
  getPersonById,
  createPerson,
  deletePersonById,
  updatePersonById
};