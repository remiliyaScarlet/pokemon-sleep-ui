import {IngredientProduction} from '@/types/game/pokemon/ingredient';


export const testIngredientProductions: {[id in string]: IngredientProduction[]} = {
  general: [
    {id: 13, qty: 2}, {id: 5, qty: 8},
  ],
  a1: [
    {id: 13, qty: 2},
  ],
  a2: [
    {id: 13, qty: 2}, {id: 13, qty: 5},
  ],
  a1b1: [
    {id: 13, qty: 2}, {id: 5, qty: 8},
  ],
  a3: [
    {id: 13, qty: 2}, {id: 13, qty: 5}, {id: 13, qty: 7},
  ],
  a2b1: [
    {id: 13, qty: 2}, {id: 13, qty: 5}, {id: 5, qty: 12},
  ],
  a1b1c1: [
    {id: 13, qty: 2}, {id: 5, qty: 8}, {id: 2, qty: 7},
  ],
};
