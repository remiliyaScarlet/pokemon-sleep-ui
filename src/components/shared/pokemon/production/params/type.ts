import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';


export type PokemonProducingParamsCommonProps = {
  params: PokemonProducingParams,
  noIcon?: boolean,
  dimension?: Dimension,
};
