import {PokedexMap, PokemonInfo, PokemonIngredientDropData} from '@/types/game/pokemon';


export type PokemonIngredientStatsCommonProps = {
  pokedex: PokedexMap,
  dropData: PokemonIngredientDropData[],
};

export type PokemonBerryStatsCommonProps = {
  pokedex: PokedexMap,
  pokemonOfBerry: PokemonInfo[],
};
