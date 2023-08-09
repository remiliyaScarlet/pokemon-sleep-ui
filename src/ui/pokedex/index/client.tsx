'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {PokedexResultCount} from '@/ui/pokedex/index/count';
import {useFilteredPokedex} from '@/ui/pokedex/index/hook';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexClientCommonProps, SortedPokemonInfo} from '@/ui/pokedex/index/type';
import {usePokedexAutoUpload} from '@/ui/pokedex/index/upload';
import {getPokemonSorter, sortPokemon} from '@/ui/pokedex/index/utils';
import {classNames} from '@/utils/react';


export const PokedexClient = (props: PokedexClientCommonProps) => {
  const {pokedex, ingredientMap, berryMap, session} = props;
  const {filter, setFilter, isIncluded} = useFilteredPokedex({
    data: pokedex,
    display: session?.user.data.pokedex,
  });
  usePokedexAutoUpload({filter});

  const sortedData = pokedex
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

  return (
    <>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <AdsUnit/>
      <PokedexResultCount data={pokedex} inclusionMap={isIncluded}/>
      <Flex direction="row" wrap className="gap-1.5">
        {sortedData.map(({pokemon, sorter}) => (
          <div
            key={pokemon.id}
            className={classNames(
              'relative width-with-gap-sm width-with-gap-2-items xs:width-with-gap-3-items',
              'sm:width-with-gap-4-items md:width-with-gap-5-items',
              'lg:width-with-gap-6-items xl:width-with-gap-8-items',
              isIncluded[pokemon.id] ? undefined : 'hidden',
            )}
          >
            <PokedexLink
              pokemon={pokemon}
              display={filter.display}
              level={filter.level}
              sorter={sorter}
              {...props}
            />
          </div>
        ))}
      </Flex>
      <AdsUnit/>
    </>
  );
};
