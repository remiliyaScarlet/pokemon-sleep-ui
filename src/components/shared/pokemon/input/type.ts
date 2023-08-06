import {FilterInclusionMap} from '@/components/input/filter/type';
import {BerryId} from '@/types/mongo/berry';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonSkillId, PokemonSleepTypeId, PokemonSpecialtyId, PokemonTypeId} from '@/types/mongo/pokemon';


export const pokemonInputType = [
  'pokemonType',
  'specialty',
  'sleepType',
  'ingredientFixed',
  'ingredientRandom',
  'berry',
  'mainSkill',
] as const;

export type PokemonInputType = typeof pokemonInputType[number];

export type PokemonInputFilterIdType = {
  pokemonType: PokemonTypeId,
  specialty: PokemonSpecialtyId,
  sleepType: PokemonSleepTypeId,
  ingredientFixed: IngredientId,
  ingredientRandom: IngredientId,
  berry: BerryId,
  mainSkill: PokemonSkillId,
};

export type PokemonInputFilter<K extends PokemonInputType> = Record<
  K,
  FilterInclusionMap<PokemonInputFilterIdType[K]>
>;
