import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSpecialtyCommonProps = {
  specialty: PokemonInfo['specialty'],
  dimension?: Dimension,
  active?: boolean,
};
