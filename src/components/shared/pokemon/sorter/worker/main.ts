import {getSortedPokemon} from '@/components/shared/pokemon/sorter/main';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';


const onMessage = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>(
  event: MessageEvent<SortingWorkerOpts<TExtra, TData>>,
) => {
  postMessage(getSortedPokemon(event.data) satisfies SortedPokemonInfo<TExtra, TData>[]);
};

addEventListener('message', onMessage);
