import {v4} from 'uuid';

import {teamAnalysisCompVersion} from '@/const/user/teamAnalysis';
import {PokeInBox} from '@/types/game/pokebox/main';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {getDefaultTeamName} from '@/ui/team/analysis/utils';
import {toTeamAnalysisMemberNullable} from '@/utils/team/toMember';


export type ToTeamAnalysisCompFromPokeboxOpts = {
  members: PokeInBox[],
  name: string,
};

export const toTeamAnalysisCompFromPokebox = ({
  members,
  name,
}: ToTeamAnalysisCompFromPokeboxOpts): TeamAnalysisComp => {
  const uuid = v4();

  return {
    version: teamAnalysisCompVersion,
    uuid,
    name: name || getDefaultTeamName(uuid),
    snorlaxFavorite: {},
    analysisPeriod: 'daily',
    staminaConfig: null,
    members: {
      A: toTeamAnalysisMemberNullable(members.at(0)) ?? null,
      B: toTeamAnalysisMemberNullable(members.at(1)) ?? null,
      C: toTeamAnalysisMemberNullable(members.at(2)) ?? null,
      D: toTeamAnalysisMemberNullable(members.at(3)) ?? null,
      E: toTeamAnalysisMemberNullable(members.at(4)) ?? null,
    },
  };
};
