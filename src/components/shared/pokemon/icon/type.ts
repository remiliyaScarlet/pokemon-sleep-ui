import {PokedexMap, PokemonInfo, PokemonItemDropData} from '@/types/game/pokemon';


export type PokemonIngredientStatsCommonProps = {
  pokedex: PokedexMap,
  dropData: PokemonItemDropData[],
};

export type PokemonBerryStatsCommonProps = {
  pokedex: PokedexMap,
  pokemonOfBerry: PokemonInfo[],
};
