import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonCarryLimit} from '@/components/shared/pokemon/carryLimit/main';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamAnalysisSkillRate} from '@/ui/team/analysis/setup/common/skill';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const TeamAnalysisPokemonProduction = (props: TeamAnalysisPokemonProps) => {
  const {
    pokemon,
    stats,
    berryDataMap,
  } = props;

  const {specialty, berry, skill} = pokemon;
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
      <PokemonProductionSplitFromPokemonRate
        rate={stats}
        state={stateOfRateToShow}
        specialty={specialty}
      />
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.berry && 'info-highlight')}>
        <TeamAnalysisBerryRate
          id={berryData.id}
          rate={toProducingRateOfState({rate: stats.berry, state: 'equivalent'})}
        />
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.ingredient && 'info-highlight')}>
        {ingredientRates.map((rate) => (
          <TeamAnalysisIngredientRate
            key={rate.id}
            id={rate.id}
            rate={toProducingRateOfState({rate, state: 'equivalent'})}
          />
        ))}
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex center className={clsx(specialty === specialtyIdMap.skill && 'info-highlight')}>
        <TeamAnalysisSkillRate
          id={skill}
          rate={toProducingRateOfState({rate: stats.skill, state: 'equivalent'})}
        />
      </Flex>
    </>
  );
};
