'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/hook';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {sortPokemon} from '@/ui/pokedex/index/utils';
import {classNames} from '@/utils/react';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {pokedex, ingredientMap, berryMap} = props;
  const {filter, setFilter, isIncluded} = useFilteredPokedex({data: pokedex});

  const sortedData = pokedex.sort(sortPokemon({
    type: filter.sort,
    level: filter.level,
    ingredientMap,
    berryMap,
  }));

  return (
    <>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <HorizontalSplitter/>
      <PokedexResultCount data={pokedex} inclusionMap={isIncluded}/>
      <Flex direction="row" wrap className="gap-1.5">
        {sortedData.map((pokemon) => (
          <div
            key={pokemon.id}
            className={classNames(
              'relative width-with-gap-sm width-with-gap-2-items xs:width-with-gap-3-items',
              'sm:width-with-gap-4-items md:width-with-gap-5-items',
              'lg:width-with-gap-6-items xl:width-with-gap-8-items',
              isIncluded[pokemon.id] ? undefined : 'hidden',
            )}
          >
            <PokedexLink pokemon={pokemon} display={filter.display} level={filter.level} {...props}/>
          </div>
        ))}
      </Flex>
    </>
  );
};
