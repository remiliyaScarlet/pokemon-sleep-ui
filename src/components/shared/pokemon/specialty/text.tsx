import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSpecialtyProps} from '@/components/shared/pokemon/specialty/type';
import {specialtyBgClass} from '@/styles/classes';
import {classNames} from '@/utils/react';


type Props = PokemonSpecialtyProps & {
  hideText?: boolean,
};

export const PokemonSpecialtyText = ({specialty, dimension, hideText}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      {specialty ?
        <>
          <div className={classNames(dimension ?? 'h-3 w-3', 'rounded-full', specialtyBgClass[specialty])}/>
          {!hideText && <div>{t(`Specialty.${specialty}`)}</div>}
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </Flex>
  );
};
