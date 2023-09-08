import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export type PokeInBoxTableDetailsProps = PokeInBoxCommonProps & {
  isLevelPreview: boolean,
  rateOfBerry: ProducingRateOfItem,
  rateOfIngredients: ProducingRateOfItem[],
};
