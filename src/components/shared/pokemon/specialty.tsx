import React from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {specialtyBgClass} from '@/styles/classes';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {classNames} from '@/utils/react';


type Props = {
  specialty: PokemonInfo['specialty'],
  dimension?: `h-${number} w-${number}`,
};

export const PokemonSpecialty = ({specialty, dimension}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      {specialty ?
        <>
          <div className={classNames(dimension ?? 'h-3 w-3', 'rounded-full', specialtyBgClass[specialty])}/>
          <div>{t(`Specialty.${specialty}`)}</div>
        </> :
        <div className="h-5 w-5">
          <XMarkIcon/>
        </div>}
    </Flex>
  );
};
