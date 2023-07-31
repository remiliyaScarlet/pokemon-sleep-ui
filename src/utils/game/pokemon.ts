import {BerryData} from '@/types/mongo/berry';
import {PokemonBerry} from '@/types/mongo/pokemon';


export type GetPokemonBerryEnergyRateOpts = {
  frequency: number,
  level: number,
  berry: PokemonBerry,
  berryData: BerryData,
};

export const getPokemonBerryEnergyRate = ({frequency, level, berry, berryData}: GetPokemonBerryEnergyRateOpts) => {
  const current = berryData.energy[level - 1];

  const daily = 86400 / frequency * berry.quantity * current.energy;

  return {
    daily,
    weekly: daily * 7,
  };
};
