import {calculateRatingResultOfLevel} from '@/ui/rating/calc/single';
import {RatingWorkerOpts} from '@/ui/rating/type';


const onMessage = (event: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResultOfLevel(event.data));
};

addEventListener('message', onMessage);
