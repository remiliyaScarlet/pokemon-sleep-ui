import {MealLinkDisplayType} from '@/components/shared/meal/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const mealDisplayTypeToI18nId: {
  [displayType in MealLinkDisplayType]: I18nMessageKeysOfNamespace<'UI.InPage.Cooking.MealDisplayType'>
} = {
  ingredient: 'Ingredient',
  energyRange: 'EnergyRange',
};
