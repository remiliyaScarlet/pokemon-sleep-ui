import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {RatingBonus, RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


export type PokeboxRatingCache = {[uuid in string]?: RatingResultOfLevel};

export type PokeboxRatingCacheProps = {
  ratingCache: PokeboxRatingCache,
  setRatingCache: (uuid: string, result: RatingResultOfLevel) => void,
};

export type PokeboxPokeInBoxCommonProps = PokeboxRatingCacheProps & {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  berryMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  displayType: PokeboxDisplayType,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: RatingBonus,
};
