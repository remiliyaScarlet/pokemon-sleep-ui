import {getTeamMakerComps} from '@/ui/team/maker/calc/getComps';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerResult} from '@/ui/team/maker/type/result';


export const getTeamMakerFinalResult = ({
  settings,
  calculatedSettings,
  ...opts
}: TeamMakerCalcResultsOpts): TeamMakerResult => {
  return {
    settings,
    calculatedSettings,
    comps: getTeamMakerComps(opts),
  };
};
