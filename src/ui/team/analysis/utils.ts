import {
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSingleTeam,
  TeamAnalysisSlotName,
} from '@/ui/team/analysis/type';


type GetCurrentTeamOpts = {
  setup: TeamAnalysisSetup,
} & ({
  overrideSlot: TeamAnalysisSlotName,
  overrideMember: TeamAnalysisMember | null,
} | {
  overrideSlot?: never,
  overrideMember?: never,
});

export const getCurrentTeam = ({setup, overrideSlot, overrideMember}: GetCurrentTeamOpts): TeamAnalysisSingleTeam => {
  const {current, teams} = setup;

  const currentTeam = teams[current];

  if (!overrideMember) {
    return currentTeam;
  }

  return {
    ...currentTeam,
    members: {
      ...currentTeam.members,
      [overrideSlot]: overrideMember,
    },
  };
};

