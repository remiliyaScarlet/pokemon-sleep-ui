import {teamMakerMaxMemberCount} from '@/ui/team/maker/calc/const';
import {TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/type/common';
import {toSum} from '@/utils/array';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


type GetTeamMakerCandidatesOpts = {
  ratesAtMax: TeamMakerRateAtMaxPotentialData[],
};

export const getTeamMakerCandidates = ({
  ratesAtMax,
}: GetTeamMakerCandidatesOpts): TeamMakerRateAtMaxPotentialData[] => {
  if (ratesAtMax.length <= teamMakerMaxMemberCount) {
    return ratesAtMax;
  }

  const topComp = ratesAtMax.slice(0, teamMakerMaxMemberCount);
  const stopThreshold = toSum(topComp.map(({rate}) => (
    getTotalOfPokemonProducingRate({rate: rate.rate.original, state: 'equivalent'}).energy
  )));

  const ret: TeamMakerRateAtMaxPotentialData[] = topComp;
  for (let idx = teamMakerMaxMemberCount; idx <= ratesAtMax.length; idx++) {
    const tail = ratesAtMax[idx];

    const currentComp = ratesAtMax.slice(idx - teamMakerMaxMemberCount + 1, idx + 1);
    const currentCompTotalStrength = toSum(currentComp.map(({rate}) => (
      getTotalOfPokemonProducingRate({rate: rate.rate.final, state: 'equivalent'}).energy
    )));

    if (currentCompTotalStrength < stopThreshold) {
      break;
    }

    ret.push(tail);
  }

  return ret;
};
