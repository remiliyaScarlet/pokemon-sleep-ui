import {PokedexMap} from '@/types/game/pokemon';
import {PokemonProps} from '@/ui/pokedex/page/type';


export type PokemonEvolutionCommonProps = PokemonProps & {
  pokedex: PokedexMap,
};
