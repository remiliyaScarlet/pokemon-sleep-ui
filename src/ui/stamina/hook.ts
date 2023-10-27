import React from 'react';

import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {StaminaAnalysisDataProps, StaminaAnalysisState, UseStaminaAnalysisReturn} from '@/ui/stamina/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';


export const useStaminaAnalysis = ({
  preloaded,
  subSkillMap,
}: StaminaAnalysisDataProps): UseStaminaAnalysisReturn => {
  const [state, setState] = React.useState<StaminaAnalysisState>({
    ...preloaded,
    subSkill: {},
    nature: null,
  });

  return {
    state,
    setConfig: (config) => setState((original) => ({
      ...original,
      config,
    })),
    setSkillTrigger: (skillTrigger) => setState((original) => ({
      ...original,
      skillTrigger,
    })),
    setNature: (nature) => setState(({config, ...original}) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: original.subSkill,
        subSkillMap,
      });

      return {
        ...original,
        config: {
          ...config,
          recoveryRate: toRecoveryRate({
            natureId: nature,
            subSkillBonus,
          }),
        },
        nature,
      };
    }),
    setSubSkill: (subSkill) => setState(({config, ...original}) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: subSkill,
        subSkillMap,
      });

      return {
        ...original,
        config: {
          ...config,
          recoveryRate: toRecoveryRate({
            natureId: original.nature,
            subSkillBonus,
          }),
        },
        subSkill,
      };
    }),
  };
};
