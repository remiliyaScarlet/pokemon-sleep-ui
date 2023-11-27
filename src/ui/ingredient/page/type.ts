import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {SynergizedSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type IngredientProductionDataProps =
  Omit<PokemonIngredientStatsCommonProps, 'translatedSettings'> &
  SynergizedSettingsRequiredData & {
    preloaded: UserSettingsBundle,
  };
