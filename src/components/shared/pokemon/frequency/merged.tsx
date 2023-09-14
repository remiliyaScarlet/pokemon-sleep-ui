import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  berryFrequency: number,
  ingredientFrequency: number,
  baseFrequency: number,
  singleLine?: boolean,
};

export const PokemonFrequency = ({
  berryFrequency,
  ingredientFrequency,
  baseFrequency,
  singleLine,
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const dailyCount = 86400 / baseFrequency;
  const berryDailyCount = 86400 / berryFrequency;
  const ingredientDailyCount = 86400 / ingredientFrequency;

  return (
    <Flex direction="row" center noFullWidth className="gap-1.5 text-sm">
      <Flex direction="row" noFullWidth className="items-center gap-0.5">
        <PokemonDataIcon
          src="/images/generic/clock.png"
          alt={t('Stats.Frequency')}
          invert
          dimension={singleLine ? 'h-4 w-4' : 'h-8 w-8'}
        />
        <div>{formatInt(baseFrequency)}</div>
        <div>({formatFloat(dailyCount)}x)</div>
      </Flex>
      <Flex direction={singleLine ? 'row' : 'col'} noFullWidth className="gap-0.5">
        <Flex direction="row" center noFullWidth className="gap-0.5">
          <PokemonDataIcon
            src="/images/generic/berry.png"
            alt={t('Info.Berry')}
            invert
            dimension="h-4 w-4"
          />
          <div>{formatInt(berryFrequency)}</div>
          <div>({formatFloat(berryDailyCount)}x)</div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-0.5">
          <PokemonDataIcon
            src="/images/generic/ingredient.png"
            alt={t('Info.Ingredient')}
            invert
            dimension="h-4 w-4"
          />
          <div>{formatInt(ingredientFrequency)}</div>
          <div>({formatFloat(ingredientDailyCount)}x)</div>
        </Flex>
      </Flex>
    </Flex>
  );
};
