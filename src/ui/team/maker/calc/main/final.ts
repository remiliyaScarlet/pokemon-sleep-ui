import {getTeamMakerComps} from '@/ui/team/maker/calc/getComps';
import {GetTeamMakerResultsOpts} from '@/ui/team/maker/hook/type';
import {TeamMakerResult} from '@/ui/team/maker/type';


export const getTeamMakerFinalResult = ({
  settings,
  calculatedSettings,
  ...opts
}: GetTeamMakerResultsOpts): TeamMakerResult => {
  return {
    settings,
    calculatedSettings,
    comps: getTeamMakerComps(opts),
  };
};
