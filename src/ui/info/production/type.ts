import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';


export type ProducingParamsDataProps = {
  pokemonList: PokemonInfo[],
  producingParamsMap: PokemonProducingParamsMap,
  ingredientChainMap: IngredientChainMap,
};
