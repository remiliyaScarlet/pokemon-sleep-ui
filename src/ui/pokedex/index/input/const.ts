import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {PokedexDisplayType, PokedexSortType} from '@/ui/pokedex/index/input/type';


export const sortTypeToI18nId: {
  [sortType in PokedexSortType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  id: 'Sort.Id',
  ingredientEnergy: 'Sort.IngredientEnergy',
  ingredientCount: 'Sort.IngredientCount',
  berryEnergy: 'Sort.BerryEnergy',
  berryCount: 'Sort.BerryCount',
  friendshipPoint: 'Sort.FriendshipPoint',
  frequency: 'Stats.Frequency',
  totalEnergy: 'Sort.TotalEnergy',
};

export const displayTypeToI18nId: {
  [displayType in PokedexDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  ...sortTypeToI18nId,
  berry: 'Info.Berry',
  mainSkill: 'Info.MainSkill',
  ingredient: 'Info.Ingredient',
  specialty: 'Info.Specialty',
};
