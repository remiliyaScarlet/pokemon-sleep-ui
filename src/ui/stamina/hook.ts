import React from 'react';

import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {StaminaAnalysisDataProps, StaminaAnalysisState, UseStaminaAnalysisReturn} from '@/ui/stamina/type';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export const useStaminaAnalysis = ({
  preloadedStaminaConfig,
  subSkillMap,
}: StaminaAnalysisDataProps): UseStaminaAnalysisReturn => {
  const [state, setState] = React.useState<StaminaAnalysisState>({
    config: preloadedStaminaConfig,
    subSkill: {},
    nature: null,
  });

  return {
    state,
    setConfig: (config) => setState((original) => ({...original, config})),
    setNature: (nature) => setState(({config, ...original}) => ({
      ...original,
      config: {
        ...config,
        recoveryRate: {
          ...config.recoveryRate,
          general: getNatureMultiplier({id: nature, effect: 'energy'}),
        },
      },
      nature,
    })),
    setSubSkill: (subSkill) => setState(({config, ...original}) => {
      const bonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: subSkill,
        subSkillMap,
      });

      return {
        ...original,
        config: {
          ...config,
          recoveryRate: {
            ...config.recoveryRate,
            sleep: toSum(getSubSkillBonusValue(bonus, 'stamina')) || 1,
          },
        },
        subSkill,
      };
    }),
  };
};
