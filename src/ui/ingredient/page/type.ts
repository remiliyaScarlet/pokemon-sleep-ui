import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {CalculatedUserSettings} from '@/types/userData/settings';


export type IngredientProductionDataProps = Omit<PokemonIngredientStatsCommonProps, keyof CalculatedUserSettings>;
