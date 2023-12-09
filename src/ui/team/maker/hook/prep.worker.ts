import {getTeamMakerResultsOpts} from '@/ui/team/maker/calc/main/prep';
import {GetTeamMakerCalcPrepOpts} from '@/ui/team/maker/hook/type';


const onMessage = ({data}: MessageEvent<GetTeamMakerCalcPrepOpts>) => {
  const result = getTeamMakerResultsOpts(data);

  postMessage(result);
};

addEventListener('message', onMessage);
