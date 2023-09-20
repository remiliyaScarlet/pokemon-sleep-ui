import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {EvolutionData} from '@/types/game/pokemon/evolution';
import {IngredientChainId, IngredientLevel} from '@/types/game/pokemon/ingredient';
import {SleepMapId} from '@/types/game/sleepStyle';


export type PokemonId = number;

export type PokemonTypeId = number;

export type PokemonSleepTypeId = number;

export type PokemonSkillId = number;

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
  ingredientChain: IngredientChainId,
  skill: PokemonSkillId,
  evolution: EvolutionData,
};

export type PokemonInfoWithMap = {
  info: PokemonInfo,
  mapsAvailable: SleepMapId[],
};

export type PokemonItemDropData = {
  pokemon: PokemonId,
  qty: number,
};

export type PokemonIngredientMap = {[ingredient in IngredientId]?: PokemonItemDropData[]};

export type PokemonIngredientProduction = {
  pokemonId: PokemonId,
  ingredientChainId: IngredientChainId,
};

export type PokemonIngredientData = {
  ingredient: {[level in IngredientLevel]: PokemonIngredientMap},
};

export type PokedexMap = {[id in PokemonId]?: PokemonInfo};
