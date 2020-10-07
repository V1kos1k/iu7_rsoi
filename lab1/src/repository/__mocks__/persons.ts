import { IpcNetConnectOpts } from 'net';
// import { pool } from '../configDb';
import { getPersonStore, updatePersonStore } from '../../utils';

import { IPersonsResponseBody } from '../../interface/PersonResponse';
import { IPersonsRequestBody } from '../../interface/PersonRequest';

const getPersons = async (): Promise<IPersonsResponseBody[]> => {
  return getPersonStore();
};

const getPersonById = async (id: number): Promise<IPersonsResponseBody> => {
  const persons = getPersonStore();
  return persons.filter(item => item.id == id)[0];
};

const createPerson = async (body: IPersonsRequestBody): Promise<IPersonsRequestBody> => {
  const persons = getPersonStore();
  const res = { id: persons[persons.length - 1].id + 1, ...body };
  persons.push(res);
  updatePersonStore(persons);
  return res;
};

const deletePersonById = async (id: number): Promise<number> => {
  let persons = getPersonStore();

  const index = persons.findIndex(item => item.id == id);

  if (index === -1) {
    return 0;
  } else {
    persons = persons.filter(item => item.id !== id);
    updatePersonStore(persons);
    return 1;
  }
};

const updatePersonById = async (id: number, body: IPersonsRequestBody): Promise<IPersonsRequestBody | boolean> => {
  let persons = getPersonStore();

  const index = persons.findIndex(item => item.id == id);

  if (index === -1) {
    return false;
  } else {
    persons[index] = { id, ...body };
    updatePersonStore(persons);
    return persons[index];
  }
};

export default {
  getPersons,
  getPersonById,
  createPerson,
  deletePersonById,
  updatePersonById
};