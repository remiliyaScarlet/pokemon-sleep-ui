import {IngredientId} from '@/types/mongo/ingredient';


export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonBerryId = number;

export type PokemonSkillId = number;

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
  ingredients: IngredientId[],
  skill: PokemonSkillId,
};

export type PokemonInfoMap = {[id in PokemonId]: PokemonInfo};

export type PokemonIngredientData = {
  ingredient: {[ingredient in IngredientId]?: PokemonInfo[]},
  info: PokemonInfoMap,
};
