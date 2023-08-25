import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SleepStyleData} from '@/types/game/sleepStyle';


export type PokemonProps = {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleData[],
  berryData: BerryData,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
};
