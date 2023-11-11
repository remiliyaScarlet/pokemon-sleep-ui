import React from 'react';

import {SleepdexOfSleepTypeProps} from '@/ui/sleepStyle/sleepdex/ofType/type';
import {toSum, toUnique} from '@/utils/array';
import {
  getAvailableSleepStylesFromNormal,
  getAvailableSleepStylesFromSpecial,
  toSleepdexStyleId,
} from '@/utils/game/sleepdex';
import {isNotNullish} from '@/utils/type';


export const useSleepdexOfSleepType = ({
  pokemonListOfSleepType,
  sleepdex,
  sleepStyleMap,
  sleepStyleSpecialMap,
}: SleepdexOfSleepTypeProps) => {
  const {
    availableSleepStyles,
    totalSleepStyles,
  } = React.useMemo(
    () => {
      const availableSleepStyles = pokemonListOfSleepType
        .map((pokemon) => {
          const sleepStylesNormal = sleepStyleMap[pokemon.id];
          const sleepStylesSpecial = sleepStyleSpecialMap[pokemon.id];

          return {
            pokemon,
            sleepStyles: toUnique([
              ...getAvailableSleepStylesFromNormal(sleepStylesNormal),
              ...getAvailableSleepStylesFromSpecial(sleepStylesSpecial),
            ]),
          };
        })
        .filter(isNotNullish);
      const totalSleepStyles = toSum(availableSleepStyles.map(({sleepStyles}) => sleepStyles.length));

      return {
        availableSleepStyles,
        totalSleepStyles,
      };
    },
    [sleepStyleMap],
  );
  const unlockedSleepStyles = React.useMemo(
    () => toSum(availableSleepStyles.map(({pokemon, sleepStyles}) => (
      sleepStyles
        .filter((styleId) => !!sleepdex[toSleepdexStyleId({pokemonId: pokemon.id, styleId})])
        .length
    ))),
    [availableSleepStyles, sleepdex],
  );

  return {
    availableSleepStyles,
    totalSleepStyles,
    unlockedSleepStyles,
  };
};
