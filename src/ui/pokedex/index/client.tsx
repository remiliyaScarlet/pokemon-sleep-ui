'use client';
import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {usePokedexAutoUpload} from '@/ui/pokedex/index/upload';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {pokedex, ingredientMap, berryMap, session} = props;

  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    session,
  });
  usePokedexAutoUpload({filter});

  const sortedData = useSortingWorker({
    data: pokedex.map((pokemon) => ({
      pokemon: pokemon,
      level: filter.level,
      extra: null,
    } satisfies PokemonInfoWithSortingPayload<null>)),
    sort: filter.sort,
    ingredientMap,
    berryMap,
    triggerDeps: [filter],
    setLoading,
  });

  return (
    <>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <AdsUnit/>
      <PokedexResultCount data={pokedex} inclusionMap={isIncluded}/>
      <LazyLoad loading={loading}>
        <Flex direction="row" wrap className="gap-1.5">
          {sortedData.map(({source}) => (
            <div
              key={source.pokemon.id}
              className={clsx(
                'width-with-gap-sm width-with-gap-2-items xs:width-with-gap-3-items relative',
                'sm:width-with-gap-4-items md:width-with-gap-5-items',
                'lg:width-with-gap-6-items xl:width-with-gap-8-items',
                !isIncluded[source.pokemon.id] && 'hidden',
              )}
            >
              <PokedexLink
                pokemon={source.pokemon}
                display={filter.display}
                level={filter.level}
                {...props}
              />
            </div>
          ))}
        </Flex>
      </LazyLoad>
      <AdsUnit/>
    </>
  );
};
