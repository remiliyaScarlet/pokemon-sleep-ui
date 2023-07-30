import {IngredientId} from '@/types/mongo/ingredient';


export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonBerryId = number;

export type PokemonSkillId = number;

export const pokemonIngredientType = ['fixed', 'random'] as const;

export type PokemonIngredientType = typeof pokemonIngredientType[number];

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
  id: PokemonBerryId,
  quantity: number,
};

export type PokemonInfo = {
  id: PokemonId,
  type: PokemonTypeId,
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
