import React from 'react';

import {getSkillTriggerValueOfTargets, GetSkillTriggerValueOfTargetsOpts} from '@/ui/team/mainskill/calc/targets';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';


type UseSkillTriggerAnalysisCalculatedReturn = {
  units: SkillTriggerAnalysisCalculatedUnit[],
  sort: () => void,
};

export const useSkillTriggerAnalysisCalculated = (
  opts: GetSkillTriggerValueOfTargetsOpts,
): UseSkillTriggerAnalysisCalculatedReturn => {
  const {state, calculatedSettings} = opts;

  const [units, setUnits] = React.useState(getSkillTriggerValueOfTargets(opts));

  // Recalculate when `state` changes
  React.useEffect(
    () => setUnits(getSkillTriggerValueOfTargets(opts)),
    [state, calculatedSettings],
  );

  const sort = React.useCallback(
    () => setUnits((original) => [
      // Recreating an array to trigger rerender
      ...original.sort((a, b) => (
        b.skillTriggerValue.actual - a.skillTriggerValue.actual
      )),
    ]),
    [units, state, calculatedSettings],
  );

  return {units, sort};
};
