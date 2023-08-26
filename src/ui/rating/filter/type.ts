import {PokemonInputFilterExtended} from '@/components/shared/pokemon/input/type';
import {PokemonId} from '@/types/game/pokemon';
import {RatingDataProps} from '@/ui/rating/type';


export type RatingFilter = PokemonInputFilterExtended;

export type RatingFilterCommonProps = RatingDataProps & {
  onPokemonPicked: (pokemonId: PokemonId) => void,
};
