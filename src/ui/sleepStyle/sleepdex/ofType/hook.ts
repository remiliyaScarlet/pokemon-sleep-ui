import React from 'react';

import {SleepdexOfSleepTypeProps} from '@/ui/sleepStyle/sleepdex/ofType/type';
import {toSum} from '@/utils/array';
import {getAvailableSleepStyles, toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isNotNullish} from '@/utils/type';


export const useSleepdexOfSleepType = ({
  pokemonListOfSleepType,
  sleepdex,
  sleepStyleMap,
}: SleepdexOfSleepTypeProps) => {
  const {
    availableSleepStyles,
    totalSleepStyles,
  } = React.useMemo(
    () => {
      const availableSleepStyles = pokemonListOfSleepType
        .map((pokemon) => {
          const sleepStyles = sleepStyleMap[pokemon.id];

          if (!sleepStyles) {
            return null;
          }

          return {
            pokemon,
            sleepStyles: getAvailableSleepStyles(sleepStyles),
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
