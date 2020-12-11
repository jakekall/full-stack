export const calculateBmi = (height: number, mass: number): string => {
  const heightInMeters = height / 100;
  const bmi = mass / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight (unhealthy weight)';
  } else {
    return 'Obese (unhealthy weight)';
  }
};

interface BmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);
}
