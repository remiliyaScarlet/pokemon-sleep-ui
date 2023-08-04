import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokedexDisplayType, PokedexSortType} from '@/ui/pokedex/index/input/type';


export const sortTypeToTranslationId: {
  [sortType in PokedexSortType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  id: 'Sort.Id',
  ingredientEnergy: 'Sort.IngredientEnergy',
  ingredientCount: 'Sort.IngredientCount',
  berryEnergy: 'Sort.BerryEnergy',
  berryCount: 'Sort.BerryCount',
  friendshipPoint: 'Sort.FriendshipPoint',
};

export const displayTypeToTranslationId: {
  [displayType in PokedexDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  ...sortTypeToTranslationId,
  berry: 'Info.Berry',
  mainSkill: 'Info.MainSkill',
  ingredient: 'Info.Ingredient',
  specialty: 'Info.Specialty',
};
