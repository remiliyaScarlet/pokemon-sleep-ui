import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskDataProps} from '@/components/shared/pokemon/predefined/lab/onDesk/type';


export type PokemonLabDataProps =
  PokemonComplexFilterDataProps &
  PokemonOnDeskDataProps &
  UsePokemonFilterCommonData;
