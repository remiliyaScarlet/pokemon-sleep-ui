import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonCarryLimit} from '@/components/shared/pokemon/carryLimit/main';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toSum} from '@/utils/array';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const TeamAnalysisPokemonProduction = (props: TeamAnalysisPokemonProps) => {
  const {
    pokemon,
    stats,
    berryDataMap,
  } = props;

  const {berry} = pokemon;
  const berryData = berryDataMap[berry.id];
  const ingredientRates = Object.values(stats.ingredient);

  return (
    <>
      <PokemonFrequencyFromProducingRate pokemonRate={stats}/>
      <Flex direction="row" className="justify-center gap-1.5">
        <PokemonTimeToFullPack timeToFullPack={stats.fullPackStats.secondsToFull}/>
        <PokemonCarryLimit carryLimit={stats.carryLimitInfo.final}/>
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <ProducingRateUI rate={stats.total} hideQuantity/>
      <PokemonProductionSplit
        berry={stats.berry.energy[stateOfRateToShow]}
        ingredient={toSum(ingredientRates.map(({energy}) => energy[stateOfRateToShow]))}
        specialty={pokemon.specialty}
      />
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(pokemon.specialty === specialtyIdMap.berry && 'bg-blink')}>
        <TeamAnalysisBerryRate
          id={berryData.id}
          rate={toProducingRateOfState({rate: stats.berry, state: 'equivalent'})}
          period="daily"
        />
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink')}>
        {ingredientRates.map((rate) => (
          <TeamAnalysisIngredientRate
            key={rate.id}
            id={rate.id}
            rate={toProducingRateOfState({rate, state: 'equivalent'})}
            period="daily"
          />
        ))}
      </Flex>
    </>
  );
};
