import {getSortedPokemon} from '@/components/shared/pokemon/sorter/main';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';


const onMessage = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>(
  event: MessageEvent<SortingWorkerOpts<TExtra, TData>>,
) => {
  const sorted = getSortedPokemon(event.data);
  postMessage(sorted satisfies SortedPokemonInfo<TExtra, TData>[]);
};

addEventListener('message', onMessage);
