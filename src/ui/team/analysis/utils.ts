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

  // Should not check `overrideMember` because it can be `null`, which is falsy
  if (!overrideSlot) {
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

export const getDefaultTeamName = (teamUuid: string): string => {
  return teamUuid.substring(0, 8);
};

export const getTeamName = (team: TeamAnalysisSingleTeam): string => {
  return team.name || getDefaultTeamName(team.uuid);
};

export const generateEmptyTeam = (uuid: string): TeamAnalysisSingleTeam => {
  return {
    uuid,
    name: getDefaultTeamName(uuid),
    members: {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
    },
  };
};
