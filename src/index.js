import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import employeeRouter from './routes/employees.js';

const app = express();
app.use(cors()); //add the CORS headers
app.use(express.json()); //handle incoming POST/PUT with json body
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('All good. Listening. Awake.');
  //test the api is up and running
});

app.use('/api/employees', employeeRouter);
//send any request starting with '/api/employees' to the employeeRouter

app.use((req, res) => {
  //if a request makes it here with no handler... 404
  res.status(404).send('No soup for you.');
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`Listening on PORT ${PORT}`);
});
