import {specialtyIdMap} from '@/const/game/pokemon';
import {ProducingRate} from '@/types/game/producing/rate';
import {BerryData} from '@/types/mongo/berry';
import {Ingredient} from '@/types/mongo/ingredient';
import {PokemonBerry, PokemonInfo} from '@/types/mongo/pokemon';


export type GetPokemonBerryProducingRateOpts = {
  frequency: number,
  level: number,
  berry: PokemonBerry,
  berryData: BerryData,
  multiplier?: number,
};

export const getPokemonBerryProducingRate = ({
  frequency,
  level,
  berry,
  berryData,
  multiplier = 1,
}: GetPokemonBerryProducingRateOpts): ProducingRate => {
  const current = berryData.energy[level - 1];

  const quantity = 86400 / frequency * berry.quantity;
  const dailyEnergy = quantity * current.energy * multiplier;

  return {dailyEnergy, quantity};
};

export type GetPokemonIngredientProducingRateOpts = {
  pokemon: PokemonInfo,
  ingredientData: Ingredient | undefined,
  multiplier?: number,
};

export const getPokemonIngredientProducingRate = ({
  pokemon,
  ingredientData,
  multiplier = 1,
}: GetPokemonIngredientProducingRateOpts): ProducingRate => {
  const {stats, specialty} = pokemon;

  if (!ingredientData) {
    return {dailyEnergy: 0, quantity: 0};
  }

  const quantityRate = 86400 / stats.frequency * (specialty === specialtyIdMap.ingredient ? 2 : 1);
  const dailyEnergy = quantityRate * ingredientData.energy * multiplier;

  return {dailyEnergy, quantity: quantityRate};
};
