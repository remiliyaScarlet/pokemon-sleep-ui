import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';


export type ProducingRateOfPokemon = {
  pokemon: PokemonInfo,
  rate: PokemonProducingRate,
};

export type ProducingRateOfBerryOnPokemon = {
  pokemon: PokemonInfo,
  rate: ProducingRateOfStates,
};

export type ProducingRateOfIngredientsOnPokemon = {
  pokemon: PokemonInfo,
  productions: IngredientProduction[],
  // Grouped productions are mainly used for comparison
  productionsGrouped: IngredientProduction[],
  rates: ProducingRateOfStates[],
};
