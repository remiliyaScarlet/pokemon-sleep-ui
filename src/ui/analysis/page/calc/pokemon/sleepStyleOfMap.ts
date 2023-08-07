import {SleepStyleDataFlattened} from '@/types/mongo/sleepStyle';
import {getAnalysisStatsOfAppearance} from '@/ui/analysis/page/calc/pokemon/sleepStyleOfAppearance';
import {AnalysisStatsSleepStyle} from '@/ui/analysis/page/calc/type';


type GetAnalysisStatsOfMapOpts = {
  firstOfMap: SleepStyleDataFlattened[] | undefined,
  lastOfMap: SleepStyleDataFlattened[] | undefined,
  pokemonId: number,
};

export const getAnalysisStatsOfMap = ({
  firstOfMap,
  lastOfMap,
  pokemonId,
}: GetAnalysisStatsOfMapOpts): AnalysisStatsSleepStyle | null => {
  if (!firstOfMap || !lastOfMap) {
    return null;
  }

  const firstOfCurrent = firstOfMap.find((first) => first.pokemonId === pokemonId);
  const lastOfCurrent = lastOfMap.find((first) => first.pokemonId === pokemonId);

  if (!firstOfCurrent || !lastOfCurrent) {
    return null;
  }

  return {
    mapId: firstOfCurrent.mapId,
    first: getAnalysisStatsOfAppearance({
      appearances: firstOfMap,
      current: firstOfCurrent,
    }),
    last: getAnalysisStatsOfAppearance({
      appearances: lastOfMap,
      current: lastOfCurrent,
    }),
  };
};
