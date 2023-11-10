import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {AnalysisStatsSleepStyleAppearance} from '@/ui/analysis/page/calc/type';
import {getSnorlaxRankEquivalentNumber, isSameRank} from '@/utils/game/snorlax';


type GetAnalysisStatsOfAppearanceOpts = {
  appearances: SleepStyleNormalFlattened[],
  current: SleepStyleNormalFlattened,
};

export const getAnalysisStatsOfAppearance = ({
  appearances,
  current,
}: GetAnalysisStatsOfAppearanceOpts): AnalysisStatsSleepStyleAppearance => {
  return {
    snorlaxRank: current.style.rank,
    ...getAnalysisStatsOfContinuous({
      samples: appearances,
      getPokemonId: ({pokemonId}) => pokemonId,
      getValue: ({style}) => getSnorlaxRankEquivalentNumber(style.rank),
      getLinkedData: ({style}) => style.rank,
      isLinked: (sample) => (
        isSameRank(sample.style.rank, current.style.rank) &&
        sample.pokemonId !== current.pokemonId
      ),
      isCurrentRank: (sample) => isSameRank(sample.style.rank, current.style.rank),
      currentValue: getSnorlaxRankEquivalentNumber(current.style.rank),
      order: 'asc',
    }),
  };
};
