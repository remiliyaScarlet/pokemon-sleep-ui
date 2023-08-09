import {SortedPokemonInfo} from '@/ui/pokedex/index/type';
import {getPokemonSorter, sortPokemon} from '@/ui/pokedex/index/utils';
import {SortingWorkerOpts} from '@/ui/pokedex/index/worker/type';


const onMessage = (event: MessageEvent<SortingWorkerOpts>) => {
  const {pokedex, filter, ingredientMap, berryMap} = event.data;

  const sortedPokemon: SortedPokemonInfo[] = pokedex
    .map<SortedPokemonInfo>((pokemon) => ({
      pokemon,
      sorter: getPokemonSorter({
        type: filter.sort,
        level: filter.level,
        pokemon,
        ingredientMap,
        berryMap,
      }),
    }))
    .sort(sortPokemon(filter.sort));

  postMessage(sortedPokemon);
};

addEventListener('message', onMessage);
