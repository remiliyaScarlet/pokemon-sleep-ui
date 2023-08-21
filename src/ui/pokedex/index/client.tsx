'use client';
import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {defaultNeutralOpts} from '@/utils/game/producing/const';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {pokedex, ingredientMap, berryMap, session} = props;

  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    session,
  });
  useAutoUpload({
    opts: {type: 'pokedex', data: {sort: filter.sort, display: filter.display}},
    triggerDeps: [filter.sort, filter.display],
  });

  const sortedData = useSortingWorker({
    data: pokedex.map((pokemon) => ({
      pokemon: pokemon,
      level: filter.level,
      extra: null,
      ingredients: (
        pokemon.ingredients.fixed ?
          [{
            level: 1,
            id: pokemon.ingredients.fixed,
            quantity: pokemon.specialty === specialtyIdMap.ingredient ? 2 : 1,
          }] :
          []
      ),
      ...defaultNeutralOpts,
    } satisfies PokemonInfoWithSortingPayload<null>)),
    sort: filter.sort,
    ingredientMap,
    berryMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    triggerDeps: [filter],
    setLoading,
  });

  return (
    <>
      <AdsUnit/>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <PokedexResultCount data={pokedex} inclusionMap={isIncluded}/>
      <LazyLoad loading={loading}>
        <Grid className={clsx(
          'grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8',
        )}>
          {sortedData.map(({source}) => (
            isIncluded[source.pokemon.id] ?
              <PokedexLink
                key={source.pokemon.id}
                pokemon={source.pokemon}
                display={filter.display}
                level={filter.level}
                snorlaxFavorite={filter.snorlaxFavorite}
                {...props}
              /> :
              <React.Fragment key={source.pokemon.id}/>
          ))}
        </Grid>
      </LazyLoad>
      <AdsUnit/>
    </>
  );
};
