import {Meal} from '@/types/mongo/meal';
import {toSum} from '@/utils/array';


export const getMealRequiredQuantity = ({ingredients}: Meal) => toSum(ingredients.map(({quantity}) => quantity));
