import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonBerryId, PokemonInfo, PokemonSkillId, PokemonSleepTypeId, PokemonTypeId} from '@/types/mongo/pokemon';


export const pokemonInputType = [
  'pokemonType',
  'sleepType',
  'ingredientFixed',
  'ingredientRandom',
  'berry',
  'mainSkill',
] as const;

export type PokemonInfoRequiredForInput = Pick<
  PokemonInfo,
  'id' | 'type' | 'sleepType' | 'berry' | 'skill' | 'ingredients'
>;

export type PokemonInputType = typeof pokemonInputType[number];

export type PokemonInputFilterIdType = {
  pokemonType: PokemonTypeId,
  sleepType: PokemonSleepTypeId,
  ingredientFixed: IngredientId,
  ingredientRandom: IngredientId,
  berry: PokemonBerryId,
  mainSkill: PokemonSkillId,
};

export type PokemonInputFilter = {
  pokemonType: FilterInclusionMap<PokemonTypeId>,
  sleepType: FilterInclusionMap<PokemonSleepTypeId>,
  ingredientFixed: FilterInclusionMap<IngredientId>,
  ingredientRandom: FilterInclusionMap<IngredientId>,
  berry: FilterInclusionMap<PokemonBerryId>,
  mainSkill: FilterInclusionMap<PokemonSkillId>,
};
