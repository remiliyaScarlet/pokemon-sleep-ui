import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskDataProps} from '@/components/shared/pokemon/predefined/lab/onDesk/type';


export type PokemonLabDataProps = PokemonComplexFilterDataProps & PokemonOnDeskDataProps & UsePokemonFilterCommonData;
