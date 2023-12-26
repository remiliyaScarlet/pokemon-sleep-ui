import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {calculateRatingResultOfLevel} from '@/utils/game/rating/calc/main';


const onMessage = async ({data}: MessageEvent<RatingWorkerOpts>) => {
  const result = await calculateRatingResultOfLevel(data);

  postMessage(result);
};

addEventListener('message', onMessage);
