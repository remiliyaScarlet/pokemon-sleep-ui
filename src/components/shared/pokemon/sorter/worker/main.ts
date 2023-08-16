import {getSortedPokemon} from '@/components/shared/pokemon/sorter/main';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


const onMessage = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>(
  event: MessageEvent<SortingWorkerOpts<TExtra, TData>>,
) => {
  const {data, sort, ingredientMap, berryMap} = event.data;

  postMessage(getSortedPokemon({
    data,
    sort,
    ingredientMap,
    berryMap,
    ...defaultNeutralOpts,
  }) satisfies SortedPokemonInfo<TExtra, TData>[]);
};

addEventListener('message', onMessage);
