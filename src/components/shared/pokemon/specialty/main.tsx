import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {PokemonSpecialtyCommonProps} from '@/components/shared/pokemon/specialty/type';
import {getSpecialtyTextClass} from '@/styles/game/specialty';


type Props = PokemonSpecialtyCommonProps & {
  hideText?: boolean,
};

export const PokemonSpecialty = ({hideText, ...props}: Props) => {
  const {specialty, dimension, active} = props;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      {specialty ?
        <>
          <PokemonSpecialtyIcon {...props}/>
          {
            !hideText &&
            <div className={getSpecialtyTextClass(specialty, active ?? false)}>
              {t(`Specialty.${specialty}`)}
            </div>}
        </> :
        <div className={dimension ?? 'h-5 w-5'}>
          <XCircleIcon/>
        </div>}
    </Flex>
  );
};
