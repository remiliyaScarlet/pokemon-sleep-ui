import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';


export type PokemonProducingParamsCommonProps = {
  params: PokemonProducingParams,
  dimension: Dimension,
  noIcon?: boolean,
};
