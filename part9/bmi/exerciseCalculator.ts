interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number,
): Result => {
  const average =
    dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = average >= targetAmount ? true : false;
  const rating = average >= targetAmount ? 3 : average != 0 ? 2 : 1;
  const ratingDescription =
    average >= targetAmount
      ? 'job well done!'
      : average != 0
      ? 'not too bad but could be better'
      : "we'll try again next time";
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((value) => value != 0).length;

  const result = <Result>{
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average,
  };

  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));
console.log(calculateExercises([0, 0, 0, 0, 0, 0, 0], 1));
