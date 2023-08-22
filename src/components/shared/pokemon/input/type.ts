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


export const pokemonInputType = [
  'pokemonType',
  'specialty',
  'sleepType',
  'ingredientFixed',
  'ingredientRandom',
  'berry',
  'evolutionStage',
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
  evolutionStage: EvolutionStage,
  mainSkill: PokemonSkillId,
};

export type PokemonInputFilter = Record<
  PokemonInputType,
  FilterInclusionMap<PokemonInputFilterIdType[PokemonInputType]>
>;

type PokemonInputFilterCheckingOpts = {
  filter: PokemonInputFilter,
  pokemon: PokemonInfo,
};

export type PokemonInputFilterCheckExclusion = (opts: PokemonInputFilterCheckingOpts) => boolean;
