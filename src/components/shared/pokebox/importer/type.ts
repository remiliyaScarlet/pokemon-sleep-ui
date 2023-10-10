import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {TeamAnalysisMember} from '@/types/teamAnalysis';


export type PokeboxImporterCommonProps = {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ingredientChainMap: IngredientChainMap,
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
  onCloudPulled: (member: TeamAnalysisMember) => void,
};

export type PokeInBoxForFilter = Omit<PokeInBox, 'name' | 'pokemon'> & {
  name: string,
  search: string[],
  pokemon: PokemonInfo,
};

export type PokeboxImporterFilter = PokemonInputFilter & {
  name: string,
};
