import {BerryData} from '@/types/mongo/berry';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepStyleData, SleepStyleId} from '@/types/mongo/sleepStyle';


export type PokemonProps = {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleData[],
  berryData: BerryData,
};

export type CurrentPokemonImage = SleepStyleId | 'portrait';
