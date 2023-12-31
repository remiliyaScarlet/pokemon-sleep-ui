import groupBy from 'lodash/groupBy';

import {spoToDrowsyScoreMultiplier} from '@/const/game/sleepStyle';
import {
  SleepStyleMerged,
  SleepStyleNormalFlattened,
  SleepStyleSpecial,
  SleepStyleSpoRequirement,
} from '@/types/game/sleepStyle';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isNotNullish} from '@/utils/type';


type GetSpoRequirementOpts = {
  spo: number,
  drowsyPowerMultiplier: number,
};

export const getSpoRequirement = ({spo, drowsyPowerMultiplier}: GetSpoRequirementOpts): SleepStyleSpoRequirement => {
  const drowsyScore = spo * spoToDrowsyScoreMultiplier;

  return {
    snorlaxStrength: drowsyScore / drowsyPowerMultiplier,
    drowsyScore,
  };
};

type GetSleepStyleMergedOpts = {
  normal: SleepStyleNormalFlattened[],
  special: SleepStyleSpecial[],
};

export const getSleepStyleMerged = ({normal, special}: GetSleepStyleMergedOpts): SleepStyleMerged[] => {
  const groupedNormal = groupBy(
    normal,
    ({pokemonId, style}) => toSleepdexStyleId({
      pokemonId,
      styleId: style.style,
    }),
  );

  return [
    ...Object.values(groupedNormal)
      .map((normalStyles): SleepStyleMerged | null => {
        const first = normalStyles.at(0);

        if (!first) {
          return null;
        }

        return {
          ...first.style,
          pokemonId: first.pokemonId,
          mapIds: normalStyles.map(({mapId}) => mapId),
          incenseOnly: false,
        };
      })
      .filter(isNotNullish),
    ...special.map(({pokemonId, ...style}): SleepStyleMerged => ({
      pokemonId,
      mapIds: [],
      incenseOnly: !style.unreleased,
      ...style,
    })),
  ];
};
