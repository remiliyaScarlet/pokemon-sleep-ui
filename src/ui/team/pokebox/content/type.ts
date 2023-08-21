import {PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {BerryDataMap} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokedexMap, PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


export type PokeboxPokeInBoxCommonProps = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  berryMap: BerryDataMap,
  ingredientMap: IngredientMap,
  displayType: PokeboxDisplayType,
  snorlaxFavorite: SnorlaxFavorite,
};
