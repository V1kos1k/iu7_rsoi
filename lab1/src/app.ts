import express, {Request, Response} from 'express';
import personsController from './controller/persons';

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'sleep' });
});


app.get('/persons/:id', personsController.getPersonById);
app.get('/persons', personsController.getPersons);
app.post('/persons', personsController.createPerson);
app.delete('/persons/:id', personsController.deletePersonById);
app.patch('/persons/:id', personsController.updatePersonById);
