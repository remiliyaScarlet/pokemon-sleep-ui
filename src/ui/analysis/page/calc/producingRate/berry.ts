import {PokemonInfo} from '@/types/game/pokemon';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {ProducingRateOfBerryOnPokemon} from '@/ui/analysis/page/calc/producingRate/type';
import {AnalysisStatsProducingRate} from '@/ui/analysis/page/calc/type';


type GetContinuousBerryStatsOpts = {
  samples: ProducingRateOfBerryOnPokemon[],
  currentRate: ProducingRateOfStates,
  pokemon: PokemonInfo,
  getComparer: (rate: ProducingRateOfStates) => number,
};

const getContinuousBerryStats = ({
  samples,
  pokemon,
  getComparer,
  currentRate,
}: GetContinuousBerryStatsOpts) => {
  return getAnalysisStatsOfContinuous({
    samples,
    getPokemonId: ({pokemon}) => pokemon.id,
    isCurrentRank: (sample) => sample.pokemon.id === pokemon.id,
    getValue: ({rate}) => getComparer(rate),
    getLinkedData: ({rate}) => getComparer(rate),
    isLinked: ({rate}) => getComparer(rate) > getComparer(currentRate),
    currentValue: getComparer(currentRate),
  });
};

export type ToAnalysisBerryProducingRateOpts<T> = Omit<GetContinuousBerryStatsOpts, 'getComparer'> & {
  itemId: T,
};

export const toAnalysisBerryProducingRate = <T>({
  itemId,
  ...props
}: ToAnalysisBerryProducingRateOpts<T>): AnalysisStatsProducingRate<T, number> => {
  return {
    itemId,
    count: getContinuousBerryStats({
      getComparer: (rate) => rate.quantity.equivalent,
      ...props,
    }),
    energy: getContinuousBerryStats({
      getComparer: (rate) => rate.energy.equivalent,
      ...props,
    }),
  };
};
