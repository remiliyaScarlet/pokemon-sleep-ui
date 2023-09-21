import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeInBoxGridProductionTotal = (props: PokeInBoxCommonProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const {berry, ingredient} = getRateOfPokemon(props);

  const sumOfDailyIngredientEnergy = toSum(Object.values(ingredient).map(({dailyEnergy}) => dailyEnergy));

  return (
    <Flex direction="col" noFullWidth className="justify-center gap-1">
      <Flex direction="row" className="items-center gap-0.5 p-0.5">
        <ColoredEnergyIcon dimension="h-5 w-5" alt={t('Stats.Energy.Name')}/>
        <div>
          {formatFloat(
            berry.dailyEnergy +
            sumOfDailyIngredientEnergy,
          )}
        </div>
      </Flex>
      <Flex direction="col" noFullWidth className="w-3/4">
        <PokemonProductionSplit
          berry={berry.dailyEnergy}
          ingredient={sumOfDailyIngredientEnergy}
          specialty={pokemon.specialty}
        />
      </Flex>
    </Flex>
  );
};
