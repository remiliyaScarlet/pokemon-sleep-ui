import {BerryId} from '@/types/mongo/berry';
import {IngredientId} from '@/types/mongo/ingredient';


export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonSkillId = number;

export const pokemonIngredientType = ['fixed', 'random'] as const;

export type PokemonIngredientType = typeof pokemonIngredientType[number];

export type PokemonSpecialtyId = number;

export type PokemonStats = {
  frequency: number,
  maxCarry: number,
  friendshipPoints: number,
  recruit: {
    exp: number,
    shards: number
  },
};

export type PokemonBerry = {
  id: BerryId,
  quantity: number,
};

export type PokemonInfo = {
  id: PokemonId,
  type: PokemonTypeId,
  specialty: PokemonSpecialtyId | null,
  sleepType: PokemonSleepTypeId,
  stats: PokemonStats,
  berry: PokemonBerry,
  ingredients: {
    fixed?: IngredientId,
    random?: IngredientId[],
  },
  skill: PokemonSkillId,
};

export type PokemonIngredientMap = {[ingredient in IngredientId]?: PokemonId[]};

export type PokemonIngredientTypeMap = {[type in PokemonIngredientType]: PokemonInfo[]};

export type PokemonIngredientData = {
  ingredient: {[type in PokemonIngredientType]: PokemonIngredientMap},
};

export type PokedexMap = {[id in PokemonId]?: PokemonInfo};
