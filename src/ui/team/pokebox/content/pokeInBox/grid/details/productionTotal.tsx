import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {stateOfRateToShow} from '@/ui/team/pokebox/content/pokeInBox/const';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number/format';


export const PokeInBoxGridProductionTotal = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const rate = getRateOfPokemon(props);
  const {berry, ingredient} = rate;

  const sumOfDailyIngredientEnergy = (
    toSum(Object.values(ingredient).map(({energy}) => energy[stateOfRateToShow]))
  );

  return (
    <Flex noFullWidth className="justify-center gap-1">
      <Flex direction="row" className="items-center gap-0.5 p-0.5">
        <ColoredEnergyIcon dimension="h-5 w-5" alt={t('Stats.Energy.Name')}/>
        <div>
          {formatFloat(
            berry.energy[stateOfRateToShow] +
            sumOfDailyIngredientEnergy,
          )}
        </div>
      </Flex>
      <Flex noFullWidth className="w-3/4">
        <PokemonProductionSplitFromPokemonRate
          rate={rate}
          state={stateOfRateToShow}
          specialty={pokemon.specialty}
        />
      </Flex>
    </Flex>
  );
};
