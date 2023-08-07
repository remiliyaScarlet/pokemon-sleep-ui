import {ProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';


export type ProducingRateWithPokemon = {
  pokemon: PokemonInfo,
  rate: ProducingRateOfItem,
};

type GetAnalysisStatsOfItemProducingRateOpts = {
  samples: ProducingRateWithPokemon[],
  pokemon: PokemonInfo,
  getComparer: (rate: ProducingRate) => number,
  currentRate: ProducingRate,
};

export const getAnalysisStatsOfItemProducingRate = ({
  samples,
  pokemon,
  getComparer,
  currentRate,
}: GetAnalysisStatsOfItemProducingRateOpts) => {
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
