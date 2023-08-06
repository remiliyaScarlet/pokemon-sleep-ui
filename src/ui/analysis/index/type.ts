import {PokemonInputFilter, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/mongo/pokemon';


export type AnalysisIndexFilter = PokemonInputFilter<PokemonInputType>;

export type AnalysisIndexProps = {
  pokedex: PokemonInfo[],
};
