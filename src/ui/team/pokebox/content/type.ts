import {PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokedexMap, PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';


export type PokeboxPokeInBoxCommonProps = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  displayType: PokeboxDisplayType,
};
