import {GetSortedPokemonOpts} from '@/components/shared/pokemon/sorter/main';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';


export type SortingWorkerOpts<TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>> = Pick<
  GetSortedPokemonOpts<TExtra, TData>,
  'sort'
> & {
  data: TData[],
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
};
