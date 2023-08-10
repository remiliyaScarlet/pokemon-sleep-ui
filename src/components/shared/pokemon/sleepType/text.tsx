import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonSleepTypeProps} from '@/components/shared/pokemon/sleepType/type';
import {sleepTypeBgClass} from '@/styles/classes';
import {classNames} from '@/utils/react';


export const PokemonSleepTypeText = ({sleepType, dimension}: PokemonSleepTypeProps) => {
  const t = useTranslations('Game.SleepType');

  return (
    <Flex direction="row" className="gap-1" center>
      <div className={classNames(dimension ?? 'h-3 w-3', 'rounded-full', sleepTypeBgClass[sleepType])}/>
      <div>{t(sleepType.toString())}</div>
    </Flex>
  );
};
