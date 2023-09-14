import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeInBoxTableProduction = (props: PokeInBoxTableDetailsProps) => {
  const {
    pokemon,
    rateOfBerry,
    rateOfIngredients,
    display,
  } = props;

  const t = useTranslations('UI.InPage.Pokedex');

  const sumOfDailyIngredientEnergy = toSum(rateOfIngredients.map(({dailyEnergy}) => dailyEnergy));

  return (
    <>
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionBerry'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className={clsx(
          'w-48 gap-1 p-0',
          pokemon.specialty === specialtyIdMap.berry && 'bg-blink',
        )}>
          <PokemonBerryIcon id={pokemon.berry.id}/>
          <div>
            x{formatFloat(rateOfBerry.quantity)}
          </div>
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(rateOfBerry.dailyEnergy)}
          </div>
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionIngredient'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" wrap center noFullWidth className={clsx(
          'w-72 gap-x-3 gap-y-0.5 p-0.5 text-xs',
          pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
        )}>
          {rateOfIngredients.map(({id, quantity, dailyEnergy}) => (
            <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
              <PokemonIngredientIcon id={id} dimension="h-3.5 w-3.5"/>
              <div>
                x{formatFloat(quantity)}
              </div>
              <ColoredEnergyIcon alt={t('Stats.Energy.Name')} dimension="h-3 w-3"/>
              <div>
                {formatFloat(dailyEnergy)}
              </div>
            </Flex>
          ))}
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionTotal'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className="w-32 gap-0.5 text-lg">
          <ColoredEnergyIcon dimension="h-6 w-6" alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(rateOfBerry.dailyEnergy + sumOfDailyIngredientEnergy)}
          </div>
        </Flex>
      }
      <Flex direction="col" noFullWidth className="w-40">
        <PokemonProductionSplit
          berry={rateOfBerry.dailyEnergy}
          ingredient={sumOfDailyIngredientEnergy}
          specialty={pokemon.specialty}
        />
      </Flex>
    </>
  );
};
