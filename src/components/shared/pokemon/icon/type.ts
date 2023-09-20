import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


export type PokemonProducingStatsCommonProps = {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  noCollectDurations: number[],
};

export type PokemonIngredientStatsCommonProps = PokemonProducingStatsCommonProps;

export type PokemonBerryStatsCommonProps = PokemonProducingStatsCommonProps & {
  pokemonOfBerry: PokemonInfo[],
};

export type PokemonProducingStats = {
  rate: ProducingRateOfItem,
  identifier: string,
  ingredients: IngredientProduction[],
  dailyTotalEnergy: number,
};
