import {FilterInclusionMap} from '@/components/input/filter/type';
import {EvolutionStage} from '@/types/game/pokemon/evolution';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonSkillId, PokemonSleepTypeId, PokemonSpecialtyId, PokemonTypeId} from '@/types/game/pokemon';


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

export type PokemonInputFilter = Record<
  PokemonInputType,
  FilterInclusionMap<PokemonInputFilterIdType[PokemonInputType]>
>;
