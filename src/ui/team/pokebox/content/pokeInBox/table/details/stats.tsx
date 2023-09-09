import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


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
      <Flex direction="col" center noFullWidth className="w-40">
        <PokemonFrequency
          berryFrequency={rateOfBerry.frequency}
          ingredientFrequency={rateOfIngredients.at(0)?.frequency ?? 0}
        />
      </Flex>
    </>
  );
};
