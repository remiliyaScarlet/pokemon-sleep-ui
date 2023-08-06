import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type AnalysisIndexFilter = PokemonInputFilter;

export type AnalysisIndexProps = {
  pokedex: PokemonInfo[],
};
