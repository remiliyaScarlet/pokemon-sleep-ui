import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {formatSeconds} from '@/utils/time';


type Props = {
  timeToFullPack: number,
  normalText?: boolean,
  className?: string,
};

export const PokemonTimeToFullPack = ({timeToFullPack, normalText, className}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-center gap-0.5',
      !normalText && 'text-sm',
      className,
    )}>
      <PokemonDataIcon
        src="/images/generic/bag.png"
        alt={t('Stats.TimeToFullPack')}
        dimension={normalText ? 'h-6 w-6' : 'h-4 w-4'}
        invert
      />
      <div>{formatSeconds(timeToFullPack)}</div>
    </Flex>
  );
};
