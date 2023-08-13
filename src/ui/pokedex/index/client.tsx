'use client';
import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {usePokedexAutoUpload} from '@/ui/pokedex/index/upload';
import {useSortingWorker} from '@/ui/pokedex/index/worker/hook';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {pokedex, ingredientMap, berryMap, session} = props;

  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    session,
  });
  usePokedexAutoUpload({filter});

  const sortedData = useSortingWorker({
    pokedex,
    filter,
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
      <Flex direction="col" className={clsx('relative', loading && 'min-h-[8rem]')}>
        {
          loading &&
          <Flex direction="col" className={clsx(
            'absolute left-0 top-0 z-20 h-full rounded-lg bg-slate-100/80 dark:bg-slate-800/80',
          )}>
            <Flex direction="col" className="h-40">
              <LoadingIcon/>
            </Flex>
          </Flex>
        }
        <Flex direction="row" wrap className="gap-1.5">
          {sortedData.map(({pokemon}) => (
            <div
              key={pokemon.id}
              className={clsx(
                'width-with-gap-sm width-with-gap-2-items xs:width-with-gap-3-items relative',
                'sm:width-with-gap-4-items md:width-with-gap-5-items',
                'lg:width-with-gap-6-items xl:width-with-gap-8-items',
                !isIncluded[pokemon.id] && 'hidden',
              )}
            >
              <PokedexLink
                pokemon={pokemon}
                display={filter.display}
                level={filter.level}
                {...props}
              />
            </div>
          ))}
        </Flex>
      </Flex>
      <AdsUnit/>
    </>
  );
};
