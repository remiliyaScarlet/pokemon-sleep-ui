import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {sleepTypeBgClass} from '@/styles/classes';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension
};

export const PokemonSleepType = ({sleepType, dimension}: Props) => {
  const t = useTranslations('Game.SleepType');

  return (
    <Flex direction="row" className="gap-1" center>
      <div className={classNames(dimension ?? 'h-3 w-3', 'rounded-full', sleepTypeBgClass[sleepType])}/>
      <div>{t(sleepType.toString())}</div>
    </Flex>
  );
};
