import express from 'express';
import qs from 'qs';
import { calculateBmi } from '../bmiCalculator';

const app = express();

app.set('query parser', (str: string) => qs.parse(str, { parameterLimit: 2 }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const parsedHeight = parseFloat(height as string);
    const parsedWeight = parseFloat(weight as string);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
      return res.send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(parsedHeight, parsedWeight);
    res.send(bmi);
  } catch (error) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
