import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {ProducingRateOfIngredientsOnPokemon} from '@/ui/analysis/page/calc/producingRate/type';
import {AnalysisIngredientStatsLinkedData, AnalysisStatsProducingRate} from '@/ui/analysis/page/calc/type';
import {toSum} from '@/utils/array';


type GetContinuousIngredientStatsOpts = {
  samples: ProducingRateOfIngredientsOnPokemon[],
  currentRate: ProducingRateOfStates[],
  currentIngredients: IngredientProduction[],
  pokemon: PokemonInfo,
  getComparer: (rates: ProducingRateOfStates[]) => number,
};

const getContinuousIngredientStats = ({
  samples,
  currentRate,
  currentIngredients,
  pokemon,
  getComparer,
}: GetContinuousIngredientStatsOpts) => {
  return getAnalysisStatsOfContinuous({
    samples,
    getPokemonId: ({pokemon}) => pokemon.id,
    isCurrentRank: (sample) => (
      sample.pokemon.id === pokemon.id &&
      isEqual(sortBy(sample.productionsGrouped, ({id}) => id), sortBy(currentIngredients, ({id}) => id))
    ),
    getValue: ({rates}) => getComparer(rates),
    getLinkedData: ({rates, productions}) => ({
      productions,
      value: getComparer(rates),
    }) satisfies AnalysisIngredientStatsLinkedData,
    isLinked: ({rates}) => getComparer(rates) > getComparer(currentRate),
    currentValue: getComparer(currentRate),
  });
};

export type ToAnalysisIngredientProducingRateOpts<T> = Omit<
  GetContinuousIngredientStatsOpts,
  'getComparer' | 'getLinkedData'
> & {
  itemId: T,
};

export const toAnalysisIngredientProducingRate = <T>({
  itemId,
  ...props
}: ToAnalysisIngredientProducingRateOpts<T>): AnalysisStatsProducingRate<T, AnalysisIngredientStatsLinkedData> => {
  return {
    itemId,
    count: getContinuousIngredientStats({
      ...props,
      getComparer: (rates) => (
        toSum(rates.filter(({id}) => id === itemId).map(({quantity}) => quantity.equivalent))
      ),
    }),
    energy: getContinuousIngredientStats({
      ...props,
      getComparer: (rates) => (
        toSum(rates.filter(({id}) => id === itemId).map(({energy}) => energy.equivalent))
      ),
    }),
  };
};
