import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates';
import {getTeamMakerRateAtMaxPotential} from '@/ui/team/maker/calc/getMaxPotential';
import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerInputCalculated} from '@/ui/team/maker/type/common';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerCalcGenerateCompOpts = (opts: TeamMakerCalcInitOpts): TeamMakerCalcGenerateCompOpts => {
  const {
    input,
    mealMap,
    settings,
  } = opts;
  const calculatedInput: TeamMakerInputCalculated = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
  };
  const calculatedSettings = toCalculatedUserSettings({settings});

  const ratesAtMax = getTeamMakerRateAtMaxPotential({
    calculatedInput,
    calculatedSettings,
    ...opts,
  });
  const candidates = getTeamMakerCandidates({
    input,
    calculatedInput,
    ratesAtMax,
  });

  return {
    calculatedInput,
    calculatedSettings,
    candidates,
    ...opts,
  };
};
