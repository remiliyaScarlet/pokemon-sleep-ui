import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency';
import {getRateOfBerry, getRateOfIngredients} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxStats = (props: PokeInBoxCommonProps) => {
  const {pokeInBox} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const rateOfBerry = getRateOfBerry(props);
  const rateOfIngredients = getRateOfIngredients(props);

  return (
    <Flex direction="row" className="items-center gap-1.5">
      <Flex direction="row" noFullWidth className="gap-0.5">
        <PokemonDataIcon src="/images/generic/bag.png" alt={t('Stats.MaxCarry')} invert/>
        <div>{pokeInBox.carryLimit}</div>
      </Flex>
      <PokemonFrequency
        berryFrequency={rateOfBerry.frequency}
        ingredientFrequency={rateOfIngredients.at(0)?.frequency ?? 0}
      />
    </Flex>
  );
};
