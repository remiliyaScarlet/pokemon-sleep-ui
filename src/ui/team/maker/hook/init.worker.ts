import {getTeamMakerCalcGenerateCompOpts} from '@/ui/team/maker/calc/main/generateComp';
import {TeamMakerCalcInitOpts, TeamMakerCalcInitReturn} from '@/ui/team/maker/hook/type';


const onMessage = ({data}: MessageEvent<TeamMakerCalcInitOpts>) => {
  const result = getTeamMakerCalcGenerateCompOpts(data);

  postMessage(result satisfies TeamMakerCalcInitReturn);
};

addEventListener('message', onMessage);
