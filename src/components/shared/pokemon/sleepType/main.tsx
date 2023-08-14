import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {sleepTypeTextClass} from '@/styles/classes';
import {imageSmallIconSizes} from '@/styles/image';
import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension,
  hideText?: boolean,
};

export const PokemonSleepType = ({sleepType, dimension, hideText}: Props) => {
  const t = useTranslations('Game.SleepType');

  return (
    <Flex direction="row" noFullWidth center className="gap-1">
      <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
        <NextImage
          src={`/images/sleepType/${sleepType}.png`} alt={t(sleepType.toString())}
          sizes={imageSmallIconSizes} className="invert-on-light"
        />
      </div>
      {!hideText && <div className={sleepTypeTextClass[sleepType]}>{t(sleepType.toString())}</div>}
    </Flex>
  );
};
