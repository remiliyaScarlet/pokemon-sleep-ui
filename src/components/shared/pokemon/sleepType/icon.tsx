import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {sleepTypeBgClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension,
};

export const PokemonSleepTypeIcon = ({sleepType, dimension}: Props) => {
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
