import {PokemonId, PokemonTypeId} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type PokemonClickableIconCommonProps = {
  id: PokemonId,
  type: PokemonTypeId,
  dimension?: Dimension,
};
