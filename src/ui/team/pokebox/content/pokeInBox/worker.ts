import {expose} from 'threads/worker';

import {calculateRatingResultOfLevel} from '@/utils/game/rating';


expose(calculateRatingResultOfLevel);
