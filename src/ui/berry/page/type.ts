import {BerryData} from '@/types/mongo/berry';
import {BerryFavoriteInfo} from '@/types/mongo/mapMeta';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type BerryPageCommonProps = {
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
  pokemonOfBerry: PokemonInfo[],
};
