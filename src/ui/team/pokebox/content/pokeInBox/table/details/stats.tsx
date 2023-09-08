import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {formatFloat} from '@/utils/number';


export const PokeInBoxStatsInTable = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokeInBox,
    rateOfBerry,
    rateOfIngredients,
  } = props;

  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <>
      <Flex direction="row" center noFullWidth className="w-16 gap-0.5">
        <PokemonDataIcon src="/images/generic/bag.png" alt={t('Stats.MaxCarry')} invert/>
        <div>{pokeInBox.carryLimit}</div>
      </Flex>
      <Flex direction="row" center noFullWidth className="w-32 text-sm">
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
            <div>{formatFloat(rateOfBerry.frequency)}</div>
          </Flex>
          <Flex direction="row" center noFullWidth className="gap-0.5">
            <PokemonDataIcon
              src="/images/generic/ingredient.png"
              alt={t('Info.Ingredient')}
              invert
              dimension="h-4 w-4"
            />
            <div>{formatFloat(rateOfIngredients.at(0)?.frequency ?? 0)}</div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
