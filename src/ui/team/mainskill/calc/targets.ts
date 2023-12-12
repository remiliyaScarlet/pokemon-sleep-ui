import {v4} from 'uuid';

import {getSkillTriggerValueOfUnit} from '@/ui/team/mainskill/calc/single';
import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/type';
import {isNotNullish} from '@/utils/type';


export type GetSkillTriggerValueOfTargetsOpts = GetSkillTriggerValueCommonOpts & {
  state: SkillTriggerAnalysisState,
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
    base: null,
  });

  return Object.entries(state.targets)
    .map(([id, unit]) => {
      if (!base) {
        return null;
      }

      return getSkillTriggerValueOfUnit({
        id,
        unit,
        base: {
          skillTriggerValue: base.skillTriggerValue.actual,
          skillTriggerCount: base.skillTriggerCount?.actual ?? null,
        },
        ...opts,
      });
    })
    .filter(isNotNullish);
};
