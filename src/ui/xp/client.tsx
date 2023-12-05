'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonExpCalculatorInputUI} from '@/ui/xp/input';
import {PokemonExpCalculatorTable} from '@/ui/xp/results/table';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';


export const PokemonExpCalculatorClient = (props: PokemonExpCalculatorDataProps) => {
  const {xpData} = props;
  const [input, setInput] = React.useState<PokemonExpCalculatorInput>({
    pokemon: null,
    nature: null,
    currentLv: 1,
    xpToNext: xpData.at(0)?.toNext ?? NaN,
    rate: {
      candyExpBoost: 1,
      dreamShardDepletion: 1,
    },
    ownedCandies: 0,
    showNonBreakthroughLevel: false,
  });

  return (
    <Flex className="gap-1.5 xl:flex-row">
      <PokemonExpCalculatorInputUI filter={input} setFilter={setInput} {...props}/>
      <PokemonExpCalculatorTable input={input} {...props}/>
    </Flex>
  );
};
