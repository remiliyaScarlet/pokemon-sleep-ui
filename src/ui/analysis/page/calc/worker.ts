import {getAnalysisStats} from '@/ui/analysis/page/calc/main';
import {GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


const onMessage = (event: MessageEvent<GetAnalysisStatsOpts>) => {
  postMessage(getAnalysisStats(event.data));
};

addEventListener('message', onMessage);
