import {FilterInputProps} from '@/components/input/filter/type';
import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export const pokeboxViewType = [
  'grid',
  'table',
] as const;

export type PokeboxViewType = typeof pokeboxViewType[number];

export const pokeboxDisplayType = [
  'productionTotal',
  'productionBerry',
  'productionIngredient',
  'rating',
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

export const pokeboxPreviewLevel = [
  ...ingredientLevels,
  ...pokemonSubSkillLevel,
] as const;

export type PokeboxPreviewLevel = typeof pokeboxPreviewLevel[number] | null;

export type PokeboxViewerDisplay = {
  sort: PokemonSortType,
  viewType: PokeboxViewType,
  displayType: PokeboxDisplayType,
  previewLevel: PokeboxPreviewLevel,
};

export type PokeboxViewerFilter = PokemonInputFilter & PokeboxViewerDisplay & {
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokeboxViewerInputCommonProps = FilterInputProps<PokeboxViewerFilter> & UsePokemonFilterCommonData & {
  pokemonList: PokemonInfo[],
  mapMeta: FieldMetaMap,
};
