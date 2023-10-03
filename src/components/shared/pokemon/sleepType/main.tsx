import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {PokemonSleepTypeCommonProps} from '@/components/shared/pokemon/sleepType/type';
import {getSleepTypeTextClass} from '@/styles/game/sleepType';


type Props = PokemonSleepTypeCommonProps & {
  hideText?: boolean,
};

export const PokemonSleepType = ({hideText, ...props}: Props) => {
  const {sleepType, active} = props;

  const t = useTranslations('Game.SleepType');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <PokemonSleepTypeIcon {...props}/>
      {
        !hideText &&
        <div className={getSleepTypeTextClass(sleepType, active ?? false)}>
          {t(sleepType.toString())}
        </div>
      }
    </Flex>
  );
};
