import {ProductionRate} from '@/types/game/pokemon';
import {BerryData} from '@/types/mongo/berry';
import {Ingredient} from '@/types/mongo/ingredient';
import {PokemonBerry} from '@/types/mongo/pokemon';


export type GetPokemonBerryProductionRateOpts = {
  frequency: number,
  level: number,
  berry: PokemonBerry,
  berryData: BerryData,
  multiplier?: number,
};

export const getPokemonBerryProductionRate = ({
  frequency,
  level,
  berry,
  berryData,
  multiplier = 1,
}: GetPokemonBerryProductionRateOpts): ProductionRate => {
  const current = berryData.energy[level - 1];

  const quantity = 86400 / frequency * berry.quantity;
  const dailyEnergy = quantity * current.energy * multiplier;

  return {dailyEnergy, quantity};
};

export type GetPokemonIngredientProductionRateOpts = {
  frequency: number,
  ingredientData: Ingredient | undefined,
  quantity?: number,
  multiplier?: number,
};

export const getPokemonIngredientProductionRate = ({
  frequency,
  ingredientData,
  quantity = 1,
  multiplier = 1,
}: GetPokemonIngredientProductionRateOpts): ProductionRate => {
  if (!ingredientData) {
    return {dailyEnergy: 0, quantity: 0};
  }

  const quantityRate = 86400 / frequency * quantity;
  const dailyEnergy = quantityRate * ingredientData.energy * multiplier;

  return {dailyEnergy, quantity: quantityRate};
};
