import {RatingWorkerOpts} from '@/types/game/pokemon/rating';
import {calculateRatingResultOfLevel} from '@/utils/game/rating';


const onMessage = (event: MessageEvent<RatingWorkerOpts>) => {
  postMessage(calculateRatingResultOfLevel(event.data));
};

addEventListener('message', onMessage);
