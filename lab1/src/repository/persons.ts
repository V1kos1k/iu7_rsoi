import { IpcNetConnectOpts } from 'net';
import { pool } from '../configDb';

import { IPersonsResponseBody } from '../interface/PersonResponse';
import { IPersonsRequestBody } from '../interface/PersonRequest';

const getPersons = async (): Promise<IPersonsResponseBody[]> => {
  return await pool.query<IPersonsResponseBody>('select * from _persons')
    .then((res) => {
      return res.rows;
    }) .catch((err) => {
      throw err;
    })
};

const getPersonById = async (id: number): Promise<IPersonsResponseBody> => {
  return await pool.query<IPersonsResponseBody>(`select * from _persons where id=${id}`)
  .then(res => {
    return res.rows[0];
  }) .catch(err => {
    throw err;
  })
};

const createPerson = async (body: IPersonsRequestBody): Promise<IPersonsRequestBody> => {
  return await pool.query(`insert into _persons (name, age, address, work) values ('${body.name}', 
                                                                                          ${body.age ? body.age : 18}, 
                                                                                          '${body.address ? body.address : 'unspecified'}', 
                                                                                          '${body.work ? body.work : 'unspecified'}') RETURNING id`)
    .then((res) => {
      return res.rows[0];
    }) .catch((err) => {
      throw err;
    });
};

const deletePersonById = async (id: number): Promise<number> => {
  return await pool.query(`delete from _persons where id=${id}`)
    .then((res) => {
      return res.rowCount;
    }) .catch((err) => {
      throw err;
    });
};

const updatePersonById = async (id: number, body: IPersonsRequestBody): Promise<IPersonsRequestBody | boolean> => {
  return await pool.query<IPersonsResponseBody>(`update _persons set name='${body.name}', 
                                                                      age=${body.age ? body.age : 0}, 
                                                                      address='${body.address}', 
                                                                      work='${body.work}' where id=${id} RETURNING *`)
    .then((res) => {
      return res.rows[0];
    }) .catch((err) => {
      throw err;
    });
};

export default {
  getPersons,
  getPersonById,
  createPerson,
  deletePersonById,
  updatePersonById
};