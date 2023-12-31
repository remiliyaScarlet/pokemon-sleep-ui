import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleNormal, SleepStyleSpecial} from '@/types/game/sleepStyle';
import {Nullable} from '@/utils/type';


export type PokemonGalleryCommonProps = {
  pokemon: PokemonInfo,
  pokemonBranch: Nullable<PokemonBranchData>,
  sleepStyles: SleepStyleNormal[],
  sleepStylesSpecial: SleepStyleSpecial[],
};
