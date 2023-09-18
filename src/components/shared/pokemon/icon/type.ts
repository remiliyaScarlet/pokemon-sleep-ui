import {PokedexMap, PokemonInfo, PokemonItemDropData} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';


export type PokemonProducingStatsCommonProps = {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
};

export type PokemonIngredientStatsCommonProps = PokemonProducingStatsCommonProps & {
  dropData: PokemonItemDropData[],
};

export type PokemonBerryStatsCommonProps = PokemonProducingStatsCommonProps & {
  pokemonOfBerry: PokemonInfo[],
};
