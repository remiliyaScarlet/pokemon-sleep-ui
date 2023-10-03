import {IngredientChainMap} from '@/types/game/pokemon/ingredient';


export const testIngredientChainMap: IngredientChainMap = {
  359: {
    chainId: 359,
    ingredients: {
      1: [
        {
          id: 13,
          qty: 2,
        },
      ],
      30: [
        {
          id: 5,
          qty: 8,
        },
        {
          id: 13,
          qty: 5,
        },
      ],
      60: [
        {
          id: 2,
          qty: 7,
        },
        {
          id: 5,
          qty: 12,
        },
        {
          id: 13,
          qty: 7,
        },
      ],
    },
  },
};
