import { Request, Response } from 'express';

import { IPersonsRequestBody, IPersonsRequestParameter } from '../interface/PersonRequest';
import { IPersonsResponseBody } from '../interface/PersonResponse';
import { IErrorValidationResponse } from '../interface/ErrorValidationResponse';
import { IErrorResponse } from '../interface/ErrorResponse';

import personsService from '../service/persons';

const getPersons = async (req: Request<any>, res: Response<IPersonsResponseBody[] | IErrorResponse>): Promise<void> => {
  await personsService.getPersons()
    .then(result => {
      if (result)
        res.status(200).json(result);
      else
        res.status(404).json({ message: "Not found" });
    }) .catch(() => res.status(500).json({ message: "Internal Server Error" }));
};

const getPersonById = async (req: Request<IPersonsRequestParameter>, 
                              res: Response<IPersonsResponseBody | IErrorResponse | IErrorValidationResponse>): Promise<void> => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).json({ message: "Bad Request", "errors": { error: "id not a number" } });
    return;
  }
  await personsService.getPersonById(id)
    .then(result => {
      if (result)
        res.status(200).json(result);
      else
        res.status(404).json({ message: "Not found" });
    }) .catch(() => res.status(500).json({ message: "Internal Server Error" }));
};

const createPerson = async (req: Request<IPersonsRequestBody>,
                            res: Response<void | IErrorResponse | IErrorValidationResponse>): Promise<void> => {
  const { body } = req;

  if (!(body.name)) {
    res.status(400).json({ message: "Bad Request", "errors": { error: "name not found" } });
  } else {
    await personsService.createPerson(body)
      .then(result => {
        res.set({ Location: `https://rsoi-person-service.herokuapp.com/persons/${result.id}` });
        res.status(201).json();
      }) .catch(() => res.status(500).json({ message: "Internal Server Error" }));
  }
};

const deletePersonById = async (req: Request<IPersonsRequestParameter>,
                                res: Response<void | IErrorResponse | IErrorValidationResponse>): Promise<void> => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).json({ message: "Bad Request", "errors": { error: "id not a number" } });
    return;
  }
  await personsService.deletePersonById(id)
    .then(result => {
      if (result)
        res.status(200).json();
      else
        res.status(404).json({ message: "Not found" });
    }) .catch(() => res.status(500).json({ message: "Internal Server Error" }));
};

const updatePersonById = async (req: Request<IPersonsRequestParameter, any, IPersonsRequestBody>,
                                res: Response<IPersonsResponseBody | IErrorResponse | IErrorValidationResponse>): Promise<void> => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).json({ message: "Bad Request", "errors": { error: "id not a number" } });
    return;
  }

  const { body } = req;

  await personsService.updatePersonById(id, body)
    .then(result => {
      if (result)
        res.status(200).json(result);
      else
        res.status(404).json({ message: "Not found" });
    }) .catch(() => res.status(500).json({ message: "Internal Server Error" }));
};


export default {
  getPersons,
  getPersonById,
  createPerson,
  deletePersonById,
  updatePersonById
};