import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {
  PokemonInfo,
  PokemonSkillId,
  PokemonSleepTypeId,
  PokemonSpecialtyId,
  PokemonTypeId,
} from '@/types/game/pokemon';
import {EvolutionStage} from '@/types/game/pokemon/evolution';
import {IngredientChainMap, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';


export const pokemonInputTypeOfIngredients = [
  'ingredient1',
  'ingredient2',
  'ingredient3',
] as const;

export type PokemonInputTypeOfIngredients = typeof pokemonInputTypeOfIngredients[number];

export const pokemonInputType = [
  'pokemonType',
  'specialty',
  'sleepType',
  ...pokemonInputTypeOfIngredients,
  'berry',
  'evolutionStage',
  'mainSkill',
] as const;

export type PokemonInputType = typeof pokemonInputType[number];

export const pokemonIngredientInputToLevel: {[inputType in PokemonInputTypeOfIngredients]: IngredientLevel} = {
  ingredient1: 1,
  ingredient2: 30,
  ingredient3: 60,
};

export const ingredientLevelToPokemonInput: {[level in IngredientLevel]: PokemonInputTypeOfIngredients} = {
  1: 'ingredient1',
  30: 'ingredient2',
  60: 'ingredient3',
};

export type PokemonInputFilterIdType = {
  pokemonType: PokemonTypeId,
  specialty: PokemonSpecialtyId,
  sleepType: PokemonSleepTypeId,
  ingredient1: IngredientId,
  ingredient2: IngredientId,
  ingredient3: IngredientId,
  berry: BerryId,
  evolutionStage: EvolutionStage,
  mainSkill: PokemonSkillId,
};

export type PokemonInputFilter = Record<
  PokemonInputType,
  FilterInclusionMap<PokemonInputFilterIdType[PokemonInputType]>
>;

export type PokemonInputFilterExtended = PokemonInputFilter & {
  level: number,
  mapId: FilterInclusionMap<SleepMapId>,
  snorlaxFavorite: SnorlaxFavorite,
};

export type UsePokemonFilterCommonData = {
  ingredientChainMap: IngredientChainMap,
};

export type PokemonInputFilterCheckingOpts = UsePokemonFilterCommonData & {
  filter: PokemonInputFilter,
  pokemon: PokemonInfo,
};

export type PokemonInputFilterCheckExclusion = (opts: PokemonInputFilterCheckingOpts) => boolean;
