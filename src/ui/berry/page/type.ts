import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';


export type BerryPageCommonProps = PokemonBerryStatsCommonProps & {
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
};
