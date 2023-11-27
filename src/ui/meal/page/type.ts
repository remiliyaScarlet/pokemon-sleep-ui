import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal, MealIngredient} from '@/types/game/meal/main';
import {
  PokedexMap,
  PokemonIngredientProductionMap,
  PokemonIngredientProductionMapOfLevel,
} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  SynergizedSettingsRequiredData,
  TranslatedUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';


export type MealServerDataProps = SynergizedSettingsRequiredData & {
  meal: Meal,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonIngredientProductionMap: PokemonIngredientProductionMap,
  pokemonMaxLevel: number,
  preloaded: UserSettingsBundle,
};

export type MealCommonProps = MealServerDataProps & {
  translatedSettings: TranslatedUserSettings,
};

export type MealIngredientSectionProps = MealCommonProps & {
  ingredient: MealIngredient,
  pokemonLevel: number,
  ingredientProductionMapOfLevel: PokemonIngredientProductionMapOfLevel,
};
