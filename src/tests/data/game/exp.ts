import {PokemonExpData} from '@/types/game/pokemon/xp';


export const testExpData: PokemonExpData[] = [
  {
    lv: 1,
    toNext: 54,
    shardPerCandy: 14,
    totalGained: 0,
  },
  {
    lv: 2,
    toNext: 71,
    shardPerCandy: 18,
    totalGained: 54,
  },
  {
    lv: 3,
    toNext: 108,
    shardPerCandy: 22,
    totalGained: 125,
  },
  {
    lv: 4,
    toNext: 128,
    shardPerCandy: 27,
    totalGained: 233,
  },
  {
    lv: 5,
    toNext: 164,
    shardPerCandy: 30,
    totalGained: 361,
  },
  {
    lv: 6,
    toNext: 202,
    shardPerCandy: 34,
    totalGained: 525,
  },
  {
    lv: 7,
    toNext: 244,
    shardPerCandy: 39,
    totalGained: 727,
  },
  {
    lv: 8,
    toNext: 274,
    shardPerCandy: 44,
    totalGained: 971,
  },
  {
    lv: 9,
    toNext: 315,
    shardPerCandy: 48,
    totalGained: 1245,
  },
];

export const testExpDataWithNull: PokemonExpData[] = [
  {
    lv: 1,
    toNext: 54,
    shardPerCandy: null,
    totalGained: 0,
  },
  {
    lv: 2,
    toNext: 71,
    shardPerCandy: null,
    totalGained: 54,
  },
];
