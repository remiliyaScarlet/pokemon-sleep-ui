import React from 'react';

import {clsx} from 'clsx';

import {handyCandyConversionRate, handyCandyItemId} from '@/const/game/xp';
import {PokemonKeyLevel, pokemonKeyLevels} from '@/types/game/pokemon/level';
import {PokemonExpCalculatorCandyCount} from '@/ui/xp/results/candyCount';
import {getCandiesRequired} from '@/ui/xp/results/utils';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {getNatureMultiplier} from '@/utils/game/nature';
import {formatInt} from '@/utils/number';


type Props = PokemonExpCalculatorDataProps & {
  input: PokemonExpCalculatorInput,
  multiplier: number,
  targetLv: number,
};

export const PokemonExpCalculatorTableRow = ({input, multiplier, targetLv, xpData}: Props) => {
  const {
    currentLv,
    currentToNext,
    ownedCandies,
    nature,
    showNonBreakthroughLevel,
  } = input;
  const isBreakthroughLevel = pokemonKeyLevels.includes(targetLv as PokemonKeyLevel);

  if (!showNonBreakthroughLevel && !isBreakthroughLevel) {
    return <></>;
  }

  const expToNext = (
    ((xpData[targetLv - 1].totalGained - (xpData.at(currentLv)?.totalGained ?? 0)) * multiplier + currentToNext)
  );
  const candiesRequired = getCandiesRequired({
    expToNext,
    multiplier: getNatureMultiplier({id: nature, effect: 'exp'}),
    ownedCandies,
  });

  return (
    <tr className={clsx(isBreakthroughLevel && 'bg-blink')}>
      <td>{targetLv}</td>
      <td>{formatInt(expToNext)}</td>
      <td>
        <PokemonExpCalculatorCandyCount count={candiesRequired}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candiesRequired / handyCandyConversionRate[handyCandyItemId.small]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candiesRequired / handyCandyConversionRate[handyCandyItemId.medium]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candiesRequired / handyCandyConversionRate[handyCandyItemId.large]}/>
      </td>
    </tr>
  );
};
