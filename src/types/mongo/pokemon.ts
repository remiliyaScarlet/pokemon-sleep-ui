export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonBerryId = number;

export type PokemonIngredientId = number;

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
  ingredients: PokemonIngredientId[],
  skill: PokemonSkillId,
};
