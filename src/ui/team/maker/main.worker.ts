import {getTeamMakerResults} from '@/ui/team/maker/calc/main';
import {GetTeamMakerResultsOpts} from '@/ui/team/maker/calc/type';


const onMessage = ({data}: MessageEvent<GetTeamMakerResultsOpts>) => {
  const result = getTeamMakerResults(data);

  postMessage(result);
};

addEventListener('message', onMessage);
