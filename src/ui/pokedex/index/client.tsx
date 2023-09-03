'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {toCalculateAllIngredientPossibilities} from '@/ui/pokedex/index/utils';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredientChain';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {
    pokedex,
    ingredientChainMap,
    ingredientMap,
    berryMap,
    preloaded,
  } = props;

  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    preloadedDisplay: preloaded.display,
    ...props,
  });
  useAutoUpload({
    opts: {type: 'pokedex', data: {sort: filter.sort, display: filter.display}},
    triggerDeps: [filter.sort, filter.display],
  });

  const bonus = useEffectiveBonus({
    server: preloaded.settings,
    client: session?.user.preloaded.settings,
  });
  const sortingDeps = [filter, bonus];

  const data = React.useMemo(() => pokedex.flatMap((pokemon): PokemonInfoWithSortingPayload<null>[] => {
    const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
      pokemon: pokemon,
      level: filter.level,
      extra: null,
      ...defaultNeutralOpts,
    };

    if (!toCalculateAllIngredientPossibilities(filter)) {
      return [{
        ...commonOpts,
        ingredients: [],
      }];
    }

    return [...generatePossibleIngredientProductions({
      level: filter.level,
      chain: ingredientChainMap[pokemon.ingredientChain],
    })]
      .map((ingredients) => ({...commonOpts, ingredients}));
  }), sortingDeps);
  const sortedData = useSortingWorker({
    data,
    sort: filter.sort,
    ingredientMap,
    berryDataMap: berryMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    bonus,
    triggerDeps: sortingDeps,
    setLoading,
  });

  return (
    <>
      <AdsUnit/>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <PokedexResultCount data={sortedData} inclusionMap={isIncluded}/>
      <LazyLoad loading={loading}>
        <Grid className={clsx(
          'grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8',
        )}>
          {sortedData.map(({source}) => {
            const key = `${source.pokemon.id}-${source.ingredients.map(({id}) => id).join('-')}`;

            if (!isIncluded[source.pokemon.id]) {
              return <React.Fragment key={key}/>;
            }

            return (
              <PokedexLink
                key={key}
                pokemon={source.pokemon}
                display={filter.display}
                level={filter.level}
                snorlaxFavorite={filter.snorlaxFavorite}
                ingredients={source.ingredients}
                bonus={bonus}
                {...props}
              />
            );
          })}
        </Grid>
      </LazyLoad>
      <AdsUnit/>
    </>
  );
};
