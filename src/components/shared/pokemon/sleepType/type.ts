import {PokemonSleepTypeId} from '@/types/mongo/pokemon';
import {Dimension} from '@/types/style';


export type PokemonSleepTypeProps = {
  sleepType: PokemonSleepTypeId,
  dimension?: Dimension
};
