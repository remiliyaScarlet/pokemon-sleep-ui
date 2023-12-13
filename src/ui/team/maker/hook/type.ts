import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';


export type GetTeamMakerCalcPrepOpts = TeamMakerDataProps & {
  input: TeamMakerInput,
  settings: UserSettings,
};

export type GetTeamMakerResultsOpts = GetTeamMakerCalcPrepOpts & {
  calculatedInput: TeamMakerInputCalculated,
  calculatedSettings: CalculatedUserSettings,
  candidates: TeamMakerRateAtMaxPotentialData[],
};
