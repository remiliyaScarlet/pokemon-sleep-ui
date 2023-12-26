import {RatingSetupData} from '@/types/game/pokemon/rating';


export type RatingWorkerHookReturn = {
  rate: (setupData: RatingSetupData) => void,
};
