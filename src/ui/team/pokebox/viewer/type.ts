import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokeInBox} from '@/types/game/pokebox';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokemonInfo} from '@/types/mongo/pokemon';


export const pokeboxViewType = [
  'grid',
  'table',
] as const;

export type PokeboxViewType = typeof pokeboxViewType[number];

export const pokeboxDisplayType = [
  'productionBerry',
  'productionIngredient',
  'productionTotal',
  'skills',
  'stats',
  'info',
] as const;

export type PokeboxDisplayType = typeof pokeboxDisplayType[number];

export type PokeboxPokemonForView = {
  info: PokemonInfo,
  inBox: PokeInBox,
  names: string[],
};

export type PokeboxViewerDisplay = {
  sort: PokemonSortType,
  viewType: PokeboxViewType,
  displayType: PokeboxDisplayType,
};

export type PokeboxViewerFilter = PokemonInputFilter & PokeboxViewerDisplay & {
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
};
