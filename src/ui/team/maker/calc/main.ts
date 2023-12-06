import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates';
import {getTeamMakerComps} from '@/ui/team/maker/calc/getComps';
import {getTeamMakerRateAtMaxPotential} from '@/ui/team/maker/calc/getMaxPotential';
import {GetTeamMakerResultsOpts, TeamMakerInputCalculated} from '@/ui/team/maker/calc/type';
import {TeamMakerResult} from '@/ui/team/maker/type';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerResults = (opts: GetTeamMakerResultsOpts): TeamMakerResult[] => {
  const {input, mealMap} = opts;
  const calculatedInput: TeamMakerInputCalculated = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
  };

  const ratesAtMax = getTeamMakerRateAtMaxPotential({
    calculatedInput,
    ...opts,
  });
  const candidates = getTeamMakerCandidates({ratesAtMax});

  return getTeamMakerComps({
    calculatedInput,
    candidates,
    ...opts,
  });
};
