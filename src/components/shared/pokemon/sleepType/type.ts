import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSleepTypeCommonProps = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension,
  active?: boolean,
};
