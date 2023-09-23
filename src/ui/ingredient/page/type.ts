import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';


export type IngredientProductionDataProps = Omit<PokemonIngredientStatsCommonProps, 'sleepDurations'>;
