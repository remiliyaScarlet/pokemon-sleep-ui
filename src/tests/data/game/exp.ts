import {PokemonExpValueData, PokemonShardConsumptionData} from '@/types/game/pokemon/xp';


export const testExpData: PokemonExpValueData['data'] = [
  {
    lv: 1,
    toNext: 54,
    totalGained: 0,
  },
  {
    lv: 2,
    toNext: 71,
    totalGained: 54,
  },
  {
    lv: 3,
    toNext: 108,
    totalGained: 125,
  },
  {
    lv: 4,
    toNext: 128,
    totalGained: 233,
  },
  {
    lv: 5,
    toNext: 164,
    totalGained: 361,
  },
  {
    lv: 6,
    toNext: 202,
    totalGained: 525,
  },
  {
    lv: 7,
    toNext: 244,
    totalGained: 727,
  },
  {
    lv: 8,
    toNext: 274,
    totalGained: 971,
  },
  {
    lv: 9,
    toNext: 315,
    totalGained: 1245,
  },
  {
    lv: 10,
    toNext: null,
    totalGained: 1560,
  },
];

export const testExpShardConsumption: PokemonShardConsumptionData = {
  data: {
    1: 14,
    2: 18,
    3: 22,
    4: 27,
    5: 30,
    6: 34,
    7: 39,
    8: 44,
    9: 48,
  },
};
