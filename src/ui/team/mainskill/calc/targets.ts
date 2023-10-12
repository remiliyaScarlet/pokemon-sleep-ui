import {v4} from 'uuid';

import {getSkillTriggerValueOfUnit} from '@/ui/team/mainskill/calc/single';
import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {
  SkillTriggerAnalysisCalculatedUnit,
  SkillTriggerAnalysisTargetsState,
} from '@/ui/team/mainskill/targets/type';
import {isNotNullish} from '@/utils/type';


export type GetSkillTriggerValueOfTargetsOpts = GetSkillTriggerValueCommonOpts & {
  state: SkillTriggerAnalysisTargetsState,
};

export const getSkillTriggerValueOfTargets = ({
  state,
  ...opts
}: GetSkillTriggerValueOfTargetsOpts): SkillTriggerAnalysisCalculatedUnit[] => {
  const baseUnit = state.base;
  if (!baseUnit) {
    return [];
  }

  const base = getSkillTriggerValueOfUnit({
    ...opts,
    id: v4(),
    unit: baseUnit,
    baseValue: null,
  });

  return Object.entries(state.targets)
    .map(([id, unit]) => {
      const baseValue = base?.skillTriggerValue.actual;
      if (!baseValue) {
        return null;
      }

      return getSkillTriggerValueOfUnit({
        id,
        unit,
        baseValue,
        ...opts,
      });
    })
    .filter(isNotNullish);
};
