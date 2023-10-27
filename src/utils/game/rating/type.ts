import {BerryData} from '@/types/game/berry';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating';


export type GetRatingValueOfSimulationOpts = Omit<RatingWorkerOpts, 'ingredients'> & {
  berryData: BerryData,
  ingredients: IngredientProduction[],
};
