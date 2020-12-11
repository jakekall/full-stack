interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  period: number[],
  target: number
): Result => {
  const periodLength = period.length;
  let trainingDays = 0;
  let totalHours = 0;
  for (const hours of period) {
    if (hours > 0) {
      trainingDays++;
      totalHours += hours;
    }
  }
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'good job';
  } else if (average / target > 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you suck';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface ExerciseValues {
  period: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const inputs = args.slice(2, args.length).map((value) => Number(value));
  if (inputs.every((value) => !isNaN(value))) {
    return {
      period: inputs.slice(1, inputs.length),
      target: inputs[0],
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { period, target } = parseArguments(process.argv);
  console.log(calculateExercises(period, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);
}
