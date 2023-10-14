import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {calculateRatingResultOfLevel} from '@/utils/game/rating/calc';


const onMessage = ({data}: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResultOfLevel(data));
};

addEventListener('message', onMessage);
