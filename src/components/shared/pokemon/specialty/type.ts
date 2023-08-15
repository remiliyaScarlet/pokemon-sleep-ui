import {PokemonInfo} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSpecialtyCommonProps = {
  specialty: PokemonInfo['specialty'],
  dimension?: Dimension,
};
