import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSleepTypeCommonProps = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension,
  active?: boolean,
};
