'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {useAnalysisFilter} from '@/ui/analysis/page/hook';
import {AnalysisPageInput} from '@/ui/analysis/page/input/main';
import {AnalysisMeta} from '@/ui/analysis/page/meta';
import {AnalysisStatsUI} from '@/ui/analysis/page/stats/main';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {useCalculationWorker} from '@/ui/analysis/page/worker';
import {toUnique} from '@/utils/array';


export const AnalysisPageClient = (props: AnalysisPageCommonProps) => {
  const {pokedex, pokemon, berryDataMap, sleepStyleMap} = props;

  const [stats, setStats] = React.useState<AnalysisStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const {filter, setFilter, isIncluded} = useAnalysisFilter({
    data: pokedex.map((pokemon) => ({
      info: pokemon,
      mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
    })),
  });

  useCalculationWorker({
    ...props,
    level: filter.level,
    pokemonToAnalyze: pokedex.filter(({id}) => isIncluded[id]),
    setStats,
    setLoading,
    calculateDeps: [filter],
  });

  return (
    <Flex direction="col" className="gap-1">
      <AnalysisMeta {...props}/>
      <AnalysisPageInput
        filter={filter}
        setFilter={setFilter}
        maxLevel={berryDataMap[pokemon.berry.id].energy.length}
        {...props}
      />
      <HorizontalSplitter/>
      <AnalysisStatsUI pokemon={pokemon} stats={stats} loading={loading}/>
    </Flex>
  );
};
