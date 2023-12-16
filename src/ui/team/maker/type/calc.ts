import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


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
