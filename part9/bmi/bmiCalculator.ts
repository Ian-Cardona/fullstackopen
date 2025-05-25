const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 74));
