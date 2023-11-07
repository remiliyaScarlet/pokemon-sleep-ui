import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleOfMap} from '@/types/game/sleepStyle';


export type PokemonGalleryCommonProps = {
  pokemon: PokemonInfo,
  pokemonBranches: PokemonBranchData | null | undefined,
  sleepStyles: SleepStyleOfMap[],
};
