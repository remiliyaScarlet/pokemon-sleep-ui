import {ProducingParamsDisplayResult, ProducingParamsMaximum} from '@/ui/info/production/client/type';
import {isNotNullish} from '@/utils/type';


export const getProducingParamsMaximum = (
  pokemonResult: ProducingParamsDisplayResult[],
): ProducingParamsMaximum => ({
  ingredientRate: Math.max(
    ...pokemonResult.map(({params}) => params.ingredientSplit).filter(isNotNullish),
  ),
  skillRate: Math.max(
    ...pokemonResult.map(({params}) => params.skillPercent).filter(isNotNullish),
  ),
});
