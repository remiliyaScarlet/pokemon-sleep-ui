import {BerryData} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {SleepStyleData, SleepStyleId} from '@/types/mongo/sleepStyle';


export type PokemonProps = {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleData[],
  berryData: BerryData,
  ingredientMap: IngredientMap,
};

export type CurrentPokemonImage = SleepStyleId | 'portrait';
