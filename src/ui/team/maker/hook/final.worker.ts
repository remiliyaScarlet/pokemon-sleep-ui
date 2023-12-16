import {getTeamMakerFinalResult} from '@/ui/team/maker/calc/main/final';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';


const onMessage = ({data}: MessageEvent<TeamMakerCalcResultsOpts>) => {
  const result = getTeamMakerFinalResult(data);

  postMessage(result);
};

addEventListener('message', onMessage);
