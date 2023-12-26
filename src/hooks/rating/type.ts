import {RatingSetupData} from '@/types/game/pokemon/rating/request';


export type RatingWorkerHookReturn = {
  rate: (setupData: RatingSetupData) => void,
};
