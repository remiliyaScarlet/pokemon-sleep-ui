export type IngredientId = number;

export type Ingredient = {
  id: IngredientId,
  price: number,
  energy: number,
};

export type IngredientMap = {[id in IngredientId]?: Ingredient};
