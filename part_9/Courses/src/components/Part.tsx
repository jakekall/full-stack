import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }: PartProps) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{' '}
          {part.exerciseSubmissionLink}
        </p>
      );
    case 'Typescript':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.difficulty}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
