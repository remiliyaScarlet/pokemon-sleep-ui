import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {isCurrentTeamMakerBasisValueWorse, sumTeamMakerBasisValue} from '@/ui/team/maker/calc/utils';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  calculatedInput: TeamMakerInputCalculated,
  ratesAtMax: TeamMakerRateAtMaxPotentialData[],
};

export const getTeamMakerCandidates = ({
  input,
  calculatedInput,
  ratesAtMax,
}: GetTeamMakerCandidatesOpts): TeamMakerRateAtMaxPotentialData[] => {
  const {basis, memberCount} = input;
  if (ratesAtMax.length <= memberCount) {
    return ratesAtMax;
  }

  const topComp = ratesAtMax.slice(0, memberCount);
  const stopThreshold = sumTeamMakerBasisValue(topComp.map(({rate}) => getTeamMakerBasisValue({
    pokemonRate: rate.rate.original,
    targetMeals: calculatedInput.targetMeals,
  })));

  const ret: TeamMakerRateAtMaxPotentialData[] = topComp;
  for (let idx = memberCount + 1; idx < ratesAtMax.length; idx++) {
    const tail = ratesAtMax[idx - 1];

    const currentComp = ratesAtMax.slice(idx - memberCount, idx);
    const currentCompBasisValue = sumTeamMakerBasisValue(currentComp.map(({rate}) => getTeamMakerBasisValue({
      pokemonRate: rate.rate.final,
      targetMeals: calculatedInput.targetMeals,
    })));

    if (isCurrentTeamMakerBasisValueWorse({
      basis,
      current: currentCompBasisValue,
      baseline: stopThreshold,
    })) {
      break;
    }

    ret.push(tail);
  }

  return ret;
};
