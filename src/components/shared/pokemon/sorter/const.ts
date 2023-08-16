import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const sortTypeToI18nId: {
  [sortType in PokemonSortType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
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
