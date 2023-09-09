import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {formatFloat} from '@/utils/number';


type Props = {
  berryFrequency: number,
  ingredientFrequency: number,
};

export const PokemonFrequency = ({
  berryFrequency,
  ingredientFrequency,
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" center noFullWidth className="text-sm">
      <PokemonDataIcon
        src="/images/generic/clock.png"
        alt={t('Stats.Frequency')}
        invert
        dimension="h-8 w-8"
      />
      <Flex direction="col" noFullWidth>
        <Flex direction="row" center noFullWidth className="gap-0.5">
          <PokemonDataIcon
            src="/images/generic/berry.png"
            alt={t('Info.Berry')}
            invert
            dimension="h-4 w-4"
          />
          <div>{formatFloat(berryFrequency)}</div>
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-0.5">
          <PokemonDataIcon
            src="/images/generic/ingredient.png"
            alt={t('Info.Ingredient')}
            invert
            dimension="h-4 w-4"
          />
          <div>{formatFloat(ingredientFrequency)}</div>
        </Flex>
      </Flex>
    </Flex>
  );
};
