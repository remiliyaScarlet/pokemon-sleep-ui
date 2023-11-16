import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type PokemonItemStatsWorkerOpts = CalculatedUserSettings & {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  level: number,
};
