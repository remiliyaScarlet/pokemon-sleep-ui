import {BerryDataMap} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientMap} from '@/types/game/ingredient';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxChangeableProps = {
  displayType: PokeboxDisplayType,
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
};

export type PokeInBoxCommonProps = PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
};
