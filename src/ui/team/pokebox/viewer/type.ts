import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/mongo/pokemon';


export const pokeboxDisplayType = [
  'production',
  'skills',
  'stats',
  'info',
] as const;

export type PokeboxDisplayType = typeof pokeboxDisplayType[number];

export type PokeboxPokemonForView = {
  info: PokemonInfo,
  inBox: PokeInBox,
};

export type PokeboxViewerFilter = PokemonInputFilter & {
  displayType: PokeboxDisplayType,
};
