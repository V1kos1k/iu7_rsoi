import { IPersonsResponseBody } from './interface/PersonResponse';

let store: IPersonsResponseBody[] = [];

export const initPersonStore = (): void => {
  store = [{
    id: 0,
    name: 'vika',
    age: 22,
    address: 'moscow',
    work: 'frontend developer'
  }, {
    id:1,
    name: 't',
    age: 22,
    address: 'moscow',
    work: 'golang developer'
  }];
};

export const getPersonStore = (): IPersonsResponseBody[] => {
  return store;
};

export const updatePersonStore = (newStore: IPersonsResponseBody[]): void => {
  store = newStore;
};

// export const getPersonUpdateStore = (newStore: IPersonsResponseBody): IPersonsResponseBody => {
//   return store;
// };