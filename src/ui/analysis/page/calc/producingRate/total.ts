import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/producingRate/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/producingRate/utils';
import {
  getTotalEnergyOfPokemonProducingRate,
  getTotalOfPokemonProducingRate,
} from '@/utils/game/producing/rateReducer';


type ToAnalysisTotalProducingStatsOpts = {
  pokemon: PokemonInfo,
  current: PokemonProducingRate,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisTotalProducingStats = ({
  pokemon,
  current,
  rateOfAllPokemon,
}: ToAnalysisTotalProducingStatsOpts) => {
  const currentDailyTotal = getTotalOfPokemonProducingRate({rate: current, state: 'equivalent'}).energy;

  return getAnalysisStatsOfContinuous({
    samples: rateOfAllPokemon
      .map((rateOfPokemon) => ({
        ...rateOfPokemon,
        dailyTotal: getTotalEnergyOfPokemonProducingRate(rateOfPokemon.rate),
      })),
    getPokemonId: ({pokemon}) => pokemon.id,
    getValue: ({dailyTotal}) => dailyTotal,
    getLinkedData: ({dailyTotal}) => dailyTotal,
    isLinked: ({dailyTotal}) => dailyTotal > currentDailyTotal,
    isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
    currentValue: currentDailyTotal,
  });
};
