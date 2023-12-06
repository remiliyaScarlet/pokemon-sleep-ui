import {
  SynergizedSettingsRequiredData,
  SynergizedUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';
import {toTargetMeals} from '@/utils/user/settings/utils';


export type ToSynergizedUserSettingsOpts = SynergizedSettingsRequiredData & Pick<UserSettingsBundle, 'cooking'>;

export const toSynergizedUserSettings = ({
  cooking,
  mealMap,
}: ToSynergizedUserSettingsOpts): SynergizedUserSettings => {
  return {
    recipeLevel: cooking.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: cooking.mealType,
      target: cooking.target,
      mealMap,
    }),
  };
};
