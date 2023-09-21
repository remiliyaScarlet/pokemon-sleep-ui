import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {calculateRatingResultOfLevel} from '@/utils/game/rating';


const onMessage = ({data}: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResultOfLevel(data));
};

addEventListener('message', onMessage);
