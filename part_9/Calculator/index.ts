import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  return res.send({ weight, height, bmi });
});

interface Values {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', ({ body }: { body: Values }, res) => {
  if (!body.daily_exercises || !body.target) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  if (!Array.isArray(body.daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  const period = body.daily_exercises.map((value) => Number(value));
  const target = Number(body.target);
  if (period.some((value) => isNaN(value)) || isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  return res.send(calculateExercises(period, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
