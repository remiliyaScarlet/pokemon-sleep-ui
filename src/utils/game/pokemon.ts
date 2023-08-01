import {ProductionRate} from '@/types/game/pokemon';
import {BerryData} from '@/types/mongo/berry';
import {PokemonBerry} from '@/types/mongo/pokemon';


export type GetPokemonBerryProductionRateOpts = {
  frequency: number,
  level: number,
  berry: PokemonBerry,
  berryData: BerryData,
  multiplier?: number,
};

export const getPokemonBerryProductionRate = ({
  frequency,
  level,
  berry,
  berryData,
  multiplier = 1,
}: GetPokemonBerryProductionRateOpts): ProductionRate => {
  const current = berryData.energy[level - 1];

  const daily = 86400 / frequency * berry.quantity * current.energy * multiplier;

  return {
    daily,
    weekly: daily * 7,
  };
};
