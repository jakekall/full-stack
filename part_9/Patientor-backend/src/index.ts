import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());

// There's some type issue that is discussed for example here https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43909
// I couldn't get it to work by changing package versions so I'm using this instead from the same issue
app.use((_req, _res, next) => {
  next();
}, cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
