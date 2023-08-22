import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';


export type BerryPageCommonProps = {
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
  pokemonOfBerry: PokemonInfo[],
};
