import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcGenerateCompReturn} from '@/ui/team/maker/hook/type';
import {combineIterator} from '@/utils/compute';


const onMessage = ({data}: MessageEvent<TeamMakerCalcGenerateCompOpts>) => {
  const {candidates, input} = data;
  const {memberCount} = input;

  postMessage({
    ...data,
    allPossibleTeamComps: [...combineIterator(candidates, memberCount)],
  } satisfies TeamMakerCalcGenerateCompReturn);
};

addEventListener('message', onMessage);
