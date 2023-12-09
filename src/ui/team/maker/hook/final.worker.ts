import {getTeamMakerFinalResult} from '@/ui/team/maker/calc/main/final';
import {GetTeamMakerResultsOpts} from '@/ui/team/maker/hook/type';


const onMessage = ({data}: MessageEvent<GetTeamMakerResultsOpts>) => {
  const result = getTeamMakerFinalResult(data);

  postMessage(result);
};

addEventListener('message', onMessage);
