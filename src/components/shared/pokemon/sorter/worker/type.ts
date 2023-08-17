import {GetSortedPokemonOpts} from '@/components/shared/pokemon/sorter/main';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';


export type SortingWorkerOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = GetSortedPokemonOpts<TExtra, TData>;
