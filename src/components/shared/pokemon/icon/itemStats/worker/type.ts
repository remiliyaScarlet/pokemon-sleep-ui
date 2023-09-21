import {BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonProducingRate} from '@/types/game/producing/rate';


export type PokemonItemStatsWorkerOpts = {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  level: number,
  bonus: EffectiveBonus,
  noCollectDurations: number[],
};

export type PokemonItemStatsCalcResult = {
  pokemon: PokemonInfo,
  pokemonRate: PokemonProducingRate,
  identifier: string,
  ingredients: IngredientProduction[],
  dailyTotalEnergy: number,
};

export type PokemonItemStatsWorkerReturn = PokemonItemStatsCalcResult[];
