import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/mongo/berry';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonInfo, PokemonSkillId, PokemonSleepTypeId, PokemonTypeId} from '@/types/mongo/pokemon';


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
  berry: BerryId,
  mainSkill: PokemonSkillId,
};

export type PokemonInputFilter = {
  pokemonType: FilterInclusionMap<PokemonTypeId>,
  sleepType: FilterInclusionMap<PokemonSleepTypeId>,
  ingredientFixed: FilterInclusionMap<IngredientId>,
  ingredientRandom: FilterInclusionMap<IngredientId>,
  berry: FilterInclusionMap<BerryId>,
  mainSkill: FilterInclusionMap<PokemonSkillId>,
};
