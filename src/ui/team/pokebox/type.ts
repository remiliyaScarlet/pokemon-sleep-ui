import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokedexMap} from '@/types/mongo/pokemon';


export type PokeboxCommonProps = {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
};
