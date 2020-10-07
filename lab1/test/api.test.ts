import request from 'supertest';
import { app } from '../src/app';

import { initPersonStore } from '../src/utils';

jest.mock('../src/repository/persons');

describe('api tests', () => {
	beforeEach(() => {
		initPersonStore();
	});

	// afterEach(() => {
	// 	clearStore();
	// });

	test('get all persons', async () => {
		const response = await request(app).get('/persons');
		expect(response.status).toBe(200);
	});

	test('get person by id', async () => {
		const response = await request(app).get('/persons/1');
		expect(response.status).toBe(200);
	});

	test('get person by id 404', async () => {
		const response = await request(app).get('/persons/2');
		expect(response.status).toBe(404);
	});

	test('create person', async () => {
		const response = await request(app).post('/persons')
																				.send({name: 'test',
																								age: 20,
																								address: 'moscow',
																								work: 'procrastinato'
																							});
		expect(response.status).toBe(201);
	});

	test('create person incomplete entry', async () => {
		const response = await request(app).post('/persons')
																				.send({name: 'test'});
		expect(response.status).toBe(201);
	});

	test('create person 400', async () => {
		const response = await request(app).post('/persons')
																				.send({age: 9});
		expect(response.status).toBe(400);
	});

	test('delete person id === 1', async () => {
		const response = await request(app).delete('/persons/1');
		expect(response.status).toBe(200);
	});

	test('delete person id === 50 404', async () => {
		const response = await request(app).delete('/persons/50');
		expect(response.status).toBe(404);
	});

	test('delete person id === qwerty 400', async () => {
		const response = await request(app).delete('/persons/qwerty');
		expect(response.status).toBe(400);
	});
	
	test('update person', async () => {
		const response = await request(app).patch('/persons/1')
																				.send({name: 'test',
																								age: 20,
																								address: 'moscow',
																								work: 'procrastinator'
																							});
		expect(response.status).toBe(200);
	});

	test('update person incomplete entry', async () => {
		const response = await request(app).patch('/persons/1')
																				.send({name: 'test'});
		expect(response.status).toBe(200);
	});

	test('update person 400', async () => {
		const response = await request(app).patch('/persons/qw')
																				.send({name: 'test',
																								age: 20,
																								address: 'moscow',
																								work: 'procrastinator'
																							});
		expect(response.status).toBe(400);
	});

	test('update person 404', async () => {
		const response = await request(app).patch('/persons/50')
																				.send({name: 'test',
																								age: 20,
																								address: 'moscow',
																								work: 'procrastinator'
																							});
		expect(response.status).toBe(404);
	});
});
