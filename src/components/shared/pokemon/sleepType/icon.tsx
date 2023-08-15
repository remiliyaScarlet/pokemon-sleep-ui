import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSleepTypeCommonProps} from '@/components/shared/pokemon/sleepType/type';
import {sleepTypeBgClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';


export const PokemonSleepTypeIcon = ({sleepType, dimension}: PokemonSleepTypeCommonProps) => {
  const t = useTranslations('Game.SleepType');

  return (
    <div className={clsx('rounded-full p-0.5', sleepTypeBgClass[sleepType])}>
      <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
        <NextImage
          src={`/images/sleepType/${sleepType}.png`} alt={t(sleepType.toString())}
          sizes={imageSmallIconSizes} className="invert-on-dark"
        />
      </div>
    </div>
  );
};
