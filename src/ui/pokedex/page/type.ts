import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SleepStyleOfMap} from '@/types/game/sleepStyle';
import {UserSettings} from '@/types/userData/settings';


export type PokemonProps = {
  pokedex: PokedexMap,
  pokemon: PokemonInfo,
  pokemonBranches: PokemonBranchData | null,
  pokemonProducingParams: PokemonProducingParams,
  sleepStyles: SleepStyleOfMap[],
  berryData: BerryData,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  preloadedSettings: UserSettings,
};
