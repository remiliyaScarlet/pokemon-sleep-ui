import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';


export type TeamMakerCalcInitOpts = TeamMakerDataProps & {
  input: TeamMakerInput,
  settings: UserSettings,
};

export type TeamMakerCalcGenerateCompOpts = TeamMakerCalcInitOpts & {
  calculatedInput: TeamMakerInputCalculated,
  calculatedSettings: CalculatedUserSettings,
  candidates: TeamMakerRateAtMaxPotentialData[],
};

export type TeamMakerCalcResultsOpts = TeamMakerCalcGenerateCompOpts & {
  teamComps: TeamMakerRateAtMaxPotentialData[][],
};

export type TeamMakerCalcInitReturn = TeamMakerCalcGenerateCompOpts;

export type TeamMakerCalcGenerateCompReturn = TeamMakerCalcGenerateCompOpts & {
  allPossibleTeamComps: TeamMakerRateAtMaxPotentialData[][],
};
