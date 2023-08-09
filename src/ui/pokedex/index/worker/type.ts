import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokedexData, PokedexFilter} from '@/ui/pokedex/index/type';


export type SortingWorkerOpts = {
  pokedex: PokedexData,
  filter: PokedexFilter,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
};
