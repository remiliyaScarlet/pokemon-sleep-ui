import {calculateRatingValueFromPayload} from '@/utils/game/rating/calc/fromPayload';
import {CalculateRatingDataWorkerOpts} from '@/utils/game/rating/calc/type';


const onMessage = ({data}: MessageEvent<CalculateRatingDataWorkerOpts>) => {
  postMessage(calculateRatingValueFromPayload(data));
};

addEventListener('message', onMessage);
