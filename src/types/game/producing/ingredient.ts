import {IngredientId} from '@/types/mongo/ingredient';


export type PokemonIngredientPick = {
  level: number,
  id: IngredientId,
  quantity: number,
};
