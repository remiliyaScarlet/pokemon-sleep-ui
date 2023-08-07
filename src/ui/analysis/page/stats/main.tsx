import React from 'react';

import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {AnalysisStatsOfPokemonMeta} from '@/ui/analysis/page/stats/pokemon';
import {AnalysisStatsOfProducingRate} from '@/ui/analysis/page/stats/producingRate';
import {AnalysisStatsOfSleepStyle} from '@/ui/analysis/page/stats/sleepStyle';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';


type Props = {
  pokemon: PokemonInfo,
  stats: AnalysisStats | null,
  loading: boolean,
};

export const AnalysisStatsUI = ({pokemon, stats, loading}: Props) => {
  if (!stats) {
    return (
      <Flex direction="col" center className="py-5">
        <LoadingIcon/>
      </Flex>
    );
  }

  const props: AnalysisStatsUiProps = {pokemon, stats};

  return (
    <Flex direction="row" wrap className="relative gap-1">
      {
        loading &&
        <Flex direction="col" center className="absolute z-10 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80">
          <LoadingIcon/>
        </Flex>
      }
      <AnalysisStatsOfPokemonMeta {...props}/>
      <AnalysisStatsOfProducingRate {...props}/>
      <AnalysisStatsOfSleepStyle {...props}/>
    </Flex>
  );
};
