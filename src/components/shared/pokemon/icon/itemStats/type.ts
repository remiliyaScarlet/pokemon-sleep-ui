import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type PokemonProducingStatsCommonProps = CalculatedUserSettings & {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
};

export type PokemonIngredientStatsCommonProps = PokemonProducingStatsCommonProps;

export type PokemonBerryStatsCommonProps = PokemonProducingStatsCommonProps & {
  pokemonOfBerry: PokemonInfo[],
};

export type PokemonItemStatsCalcResult = {
  pokemon: PokemonInfo,
  pokemonRate: PokemonProducingRate,
  identifier: string,
  ingredients: IngredientProduction[],
  dailyTotalEnergy: number,
};

export type PokemonItemStatsCalcResultToDisplay<TResult extends PokemonItemStatsCalcResult> = TResult & {
  itemRate: ProducingRateOfStates,
};
