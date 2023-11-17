import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettings} from '@/types/userData/settings';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxChangeableProps = {
  settings: UserSettings,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokeInBoxCommonProps = PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  ratingBasis: PokeboxViewerDisplay['ratingBasis'],
};
