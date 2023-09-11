'use client';
import React from 'react';

import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {PokemonExpCalculatorInputUI} from '@/ui/xp/input';
import {PokemonExpCalculatorTable} from '@/ui/xp/results/table';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';


export const PokemonExpCalculatorClient = (props: PokemonExpCalculatorDataProps) => {
  const {xpData} = props;
  const [input, setInput] = React.useState<PokemonExpCalculatorInput>({
    pokemon: null,
    nature: null,
    currentLv: 1,
    currentToNext: xpData.at(0)?.toNext ?? NaN,
    ownedCandies: 0,
    showNonBreakthroughLevel: false,
  });

  const maxLevel = xpData.at(-1)?.lv;

  if (!maxLevel) {
    return <Failed text="XP Data"/>;
  }

  return (
    <Flex direction="col" className="gap-1.5 md:flex-row">
      <PokemonExpCalculatorInputUI filter={input} setFilter={setInput} maxLevel={maxLevel} {...props}/>
      <PokemonExpCalculatorTable input={input} maxLevel={maxLevel} {...props}/>
    </Flex>
  );
};
