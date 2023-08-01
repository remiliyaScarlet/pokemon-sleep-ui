import {ProductionRate} from '@/types/game/pokemon';
import {BerryData} from '@/types/mongo/berry';
import {Ingredient} from '@/types/mongo/ingredient';
import {PokemonBerry, PokemonInfo} from '@/types/mongo/pokemon';


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

  const daily = 86400 / frequency * berry.quantity * current.energy * multiplier;

  return {
    daily,
    weekly: daily * 7,
  };
};


export type GetPokemonIngredientBaseProductionRateOpts = {
  frequency: number,
  ingredient: PokemonInfo['ingredients']['fixed'],
  ingredientData: Ingredient | undefined,
  quantity?: number,
};

export const getPokemonIngredientBaseProductionRate = ({
  frequency,
  ingredient,
  ingredientData,
  quantity = 1,
}: GetPokemonIngredientBaseProductionRateOpts): ProductionRate => {
  if (!ingredient || !ingredientData) {
    return {daily: 0, weekly: 0};
  }

  const daily = 86400 / frequency * quantity * ingredientData.energy;

  return {
    daily,
    weekly: daily * 7,
  };
};
