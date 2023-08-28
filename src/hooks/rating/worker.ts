import {calculateRatingResultOfLevel} from '@/hooks/rating/calc';
import {RatingWorkerOpts} from '@/hooks/rating/type';


const onMessage = (event: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResultOfLevel(event.data));
};

addEventListener('message', onMessage);
