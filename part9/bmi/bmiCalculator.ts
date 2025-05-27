import { isNotNumber } from './utils';

interface MeasuredValues {
  height: number;
  weight: number;
}

interface ResponseValues {
  weight: number;
  height: number;
  bmi: string;
}

const parseArguments = (args: string[]): MeasuredValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (
  heightInCm: number,
  weightInKg: number,
): ResponseValues => {
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  const input = {
    weight: weightInKg,
    height: heightInCm,
    bmi: null,
  };

  if (bmi < 18.5) {
    return { ...input, bmi: 'Underweight' };
  } else if (bmi < 25) {
    return { ...input, bmi: 'Normal range' };
  } else if (bmi < 30) {
    return { ...input, bmi: 'Overweight' };
  } else {
    return { ...input, bmi: 'Obese' };
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something wrong!';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  }
}
