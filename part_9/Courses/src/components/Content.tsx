import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;