import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonFrequencyFromProducingRate} from '@/components/shared/pokemon/frequency/fromRate';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split';
import {specialtyIdMap} from '@/const/game/pokemon';
import {TeamAnalysisBerryRate} from '@/ui/team/analysis/setup/common/berry';
import {TeamAnalysisIngredientRate} from '@/ui/team/analysis/setup/common/ingredient';
import {TeamAnalysisRateLayout} from '@/ui/team/analysis/setup/common/rateLayout';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';
import {toSum} from '@/utils/array';


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
      <PokemonTimeToFullPack timeToFullPack={stats.fullPackStats.secondsToFull}/>
      <HorizontalSplitter className="w-full"/>
      <TeamAnalysisRateLayout period="daily" showQuantity={false} rate={stats.total}/>
      <PokemonProductionSplit
        berry={stats.berry.dailyEnergy}
        ingredient={toSum(ingredientRates.map(({dailyEnergy}) => dailyEnergy))}
        specialty={pokemon.specialty}
      />
      <HorizontalSplitter className="w-full"/>
      <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.berry && 'bg-blink')}>
        <TeamAnalysisBerryRate
          id={berryData.id}
          rate={stats.berry}
          period="daily"
        />
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <Flex direction="col" className={clsx(pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink')}>
        {ingredientRates.map((rate) => (
          <TeamAnalysisIngredientRate
            key={rate.id}
            id={rate.id}
            rate={rate}
            period="daily"
          />
        ))}
      </Flex>
    </>
  );
};
