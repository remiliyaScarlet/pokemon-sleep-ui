import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {UserSettings} from '@/types/userData/settings';


export type BerryPageDataProps = Omit<PokemonBerryStatsCommonProps, 'sleepDurations'> & {
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
  preloadedSettings: UserSettings,
};
