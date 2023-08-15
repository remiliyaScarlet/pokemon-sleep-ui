import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokemonSpecialtyCommonProps} from '@/components/shared/pokemon/specialty/type';
import {specialtyTextClass} from '@/styles/classes';


type Props = PokemonSpecialtyCommonProps & {
  hideText?: boolean,
};

export const PokemonSpecialty = ({specialty, dimension, hideText}: Props) => {
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      {specialty ?
        <>
          <PokemonSpecialtyIcon specialty={specialty} dimension={dimension}/>
          {!hideText && <div className={specialtyTextClass[specialty]}>{t(`Specialty.${specialty}`)}</div>}
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </Flex>
  );
};
