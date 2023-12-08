export type PokemonExpTypeId = number;

export type PokemonExpValueEntry = {
  lv: number,
  toNext: number | null,
  totalGained: number,
};

export type PokemonExpValueData = {
  type: PokemonExpTypeId,
  data: PokemonExpValueEntry[],
};

export type PokemonExpValueMap = {[type in PokemonExpTypeId]?: PokemonExpValueData};

export type PokemonShardConsumptionData = {
  data: {[lv in number]?: number},
};

export type HandyCandySize = 'small' | 'medium' | 'large';
