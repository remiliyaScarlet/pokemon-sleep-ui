import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSleepTypeProps} from '@/components/shared/pokemon/sleepType/type';
import {imageSmallIconSizes} from '@/styles/image';
import {classNames} from '@/utils/react';


export const PokemonSleepTypeIcon = ({sleepType, dimension}: PokemonSleepTypeProps) => {
  const t = useTranslations('Game.SleepType');

  return (
    <div className={classNames('relative', dimension ?? 'h-5 w-5')}>
      <NextImage
        src={ `/images/sleepType/${sleepType}.png`} alt={t(sleepType.toString())}
        sizes={imageSmallIconSizes} className="invert-on-light"
      />
    </div>
  );
};
