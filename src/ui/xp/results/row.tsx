import React from 'react';

import {clsx} from 'clsx';

import {handyCandyConversionRate, handyCandyItemId} from '@/const/game/xp';
import {PokemonKeyLevel, pokemonKeyLevels} from '@/types/game/pokemon/level';
import {PokemonExpCalculatorCandyCount} from '@/ui/xp/results/candyCount';
import {PokemonLevelUpRequirements} from '@/ui/xp/results/type';
import {PokemonExpCalculatorInput} from '@/ui/xp/type';
import {formatInt, formatToAbbreviation} from '@/utils/number/format';


type Props = {
  input: PokemonExpCalculatorInput,
  data: PokemonLevelUpRequirements,
};

export const PokemonExpCalculatorTableRow = ({input, data}: Props) => {
  const {showNonBreakthroughLevel} = input;
  const {lv, xp, candy, shard} = data;
  const isBreakthroughLevel = pokemonKeyLevels.includes(lv as PokemonKeyLevel);

  if (!showNonBreakthroughLevel && !isBreakthroughLevel) {
    return null;
  }

  return (
    <tr className={clsx('[&>td]:px-1', isBreakthroughLevel && 'bg-blink')}>
      <td>{lv}</td>
      <td>{formatInt(xp)}</td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.small]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.medium]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.large]}/>
      </td>
      <td className="whitespace-nowrap">
        {formatToAbbreviation({num: shard})}
      </td>
    </tr>
  );
};
