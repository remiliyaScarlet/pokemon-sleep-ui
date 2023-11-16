import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsCalcResultToDisplay,
} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {isNotNullish} from '@/utils/type';


type ToSortedCalcResultOpts<TResult extends PokemonItemStatsCalcResult> = {
  producingStats: TResult[],
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfStates | undefined,
};

export const toSortedCalcResult = <TResult extends PokemonItemStatsCalcResult>({
  producingStats,
  getItemRate,
}: ToSortedCalcResultOpts<TResult>): PokemonItemStatsCalcResultToDisplay<TResult>[] => {
  return producingStats
    .map((stats) => {
      const itemRate = getItemRate(stats.pokemonRate);
      if (!itemRate) {
        return null;
      }

      return {...stats, itemRate};
    })
    .filter(isNotNullish)
    .sort((a, b) => (
      b.itemRate.energy.equivalent - a.itemRate.energy.equivalent
    ));
};
