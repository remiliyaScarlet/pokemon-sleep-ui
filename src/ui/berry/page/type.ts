import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {UserSettings} from '@/types/userData/settings';


export type BerryPageCommonProps = PokemonBerryStatsCommonProps & {
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
  preloadedSettings: UserSettings,
};
