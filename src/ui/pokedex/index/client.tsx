'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {useFilteredPokedex} from '@/ui/pokedex/index/hooks';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexData} from '@/ui/pokedex/index/type';
import {classNames} from '@/utils/react';


type Props = {
  data: PokedexData,
};

export const PokedexClient = ({data}: Props) => {
  const {filter, setFilter, isIncluded} = useFilteredPokedex({data});

  return (
    <>
      <PokedexInput filter={filter} setFilter={setFilter} data={data}/>
      <hr className="border-t-gray-700"/>
      <Flex direction="row" wrap className="gap-1.5 md:p-3 lg:p-5">
        {data.map((pokemon) => (
          <div
            key={pokemon.id}
            className={classNames(
              'relative width-with-gap width-with-gap-2-items xs:width-with-gap-3-items',
              'sm:width-with-gap-4-items md:width-with-gap-5-items',
              'lg:width-with-gap-6-items xl:width-with-gap-8-items',
              isIncluded[pokemon.id] ? undefined : 'hidden',
            )}
          >
            <PokedexLink {...pokemon}/>
          </div>
        ))}
      </Flex>
    </>
  );
};
