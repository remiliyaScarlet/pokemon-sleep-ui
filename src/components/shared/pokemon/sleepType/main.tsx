import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSleepTypeCommonProps} from '@/components/shared/pokemon/sleepType/type';
import {sleepTypeTextClass} from '@/styles/classes';


type Props = PokemonSleepTypeCommonProps & {
  hideText?: boolean,
};

export const PokemonSleepType = ({sleepType, dimension, hideText}: Props) => {
  const t = useTranslations('Game.SleepType');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      <PokemonSleepTypeIcon sleepType={sleepType} dimension={dimension}/>
      {!hideText && <div className={sleepTypeTextClass[sleepType]}>{t(sleepType.toString())}</div>}
    </Flex>
  );
};
