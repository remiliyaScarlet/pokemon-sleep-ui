import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {RatingRequest} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subskill';


export type PokemonRatingResultProps = {
  pokemon: PokemonInfo,
  request: RatingRequest | undefined,
  berryDataMap: BerryDataMap,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
};
