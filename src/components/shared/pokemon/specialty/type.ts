import {PokemonInfo} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSpecialtyProps = {
  specialty: PokemonInfo['specialty'],
  dimension?: Dimension,
};
