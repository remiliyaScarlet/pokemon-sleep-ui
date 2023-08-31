import React from 'react';

import {InfoIcon} from '@/components/icons/info';


type Props = {
  level: number,
};

export const PokeInBoxGridLevel = ({level}: Props) => {
  return (
    <InfoIcon className="absolute bottom-1 right-1 z-20 gap-1">
      {level}
    </InfoIcon>
  );
};
