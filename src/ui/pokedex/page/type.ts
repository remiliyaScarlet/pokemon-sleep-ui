import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepStyleData, SleepStyleId} from '@/types/mongo/sleepStyle';


export type PokemonProps = {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleData[],
};

export type CurrentPokemonImage = SleepStyleId | 'portrait';
