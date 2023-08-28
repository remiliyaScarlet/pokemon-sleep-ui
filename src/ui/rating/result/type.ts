import {PokemonInfo} from '@/types/game/pokemon';
import {RatingDataProps, RatingRequest} from '@/ui/rating/type';


export type RatingResultUiProps = RatingDataProps & {
  pokemon: PokemonInfo,
  request: RatingRequest | undefined,
};
