import express from 'express';
import qs from 'qs';
import { calculateBmi } from '../bmiCalculator';
import { calculateExercises } from '../exerciseCalculator';

const app = express();
app.use(express.json());

app.set('query parser', (str: string) => qs.parse(str, { parameterLimit: 2 }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);
    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
      throw new Error('malformatted parameters');
    }
    const bmi = calculateBmi(parsedHeight, parsedWeight);
    res.send(bmi);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message,
      });
    }
  }
});

app.post('/exercises', (req, res) => {
  console.log('Request', req.body);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyExercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    if (!dailyExercises || !target) {
      throw new Error('parameters missing');
    }

    if (!Array.isArray(dailyExercises)) {
      throw new Error('invalid array');
    }

    const dailyExerciseNumbers = dailyExercises.map((d: unknown) => {
      const num = Number(d);
      if (isNaN(num)) {
        throw new Error('invalid array');
      }
      return num;
    });

    if (isNaN(Number(target))) {
      throw new Error('malformatted parameters');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const exercises = calculateExercises(Number(target), dailyExerciseNumbers);

    res.send(exercises);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message,
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
