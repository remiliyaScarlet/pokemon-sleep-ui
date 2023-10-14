import {PokemonId} from '@/types/game/pokemon';


export type PokemonExpData = {
  lv: number,
  toNext: number,
  shardPerCandy: number | null,
  totalGained: number,
};

export type PokemonExpMultiplier = {
  pokemon: PokemonId,
  multiplier: number,
};

export type PokemonExpMultiplierMap = {[pokemon in PokemonId]?: PokemonExpMultiplier};

export type HandyCandySize = 'small' | 'medium' | 'large';
