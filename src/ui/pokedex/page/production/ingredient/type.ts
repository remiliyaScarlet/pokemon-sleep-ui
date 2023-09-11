import {EffectiveBonus} from '@/types/game/bonus';
import {ProducingRateOfItem} from '@/types/game/producing/rate';


export type PokemonIngredientCommonProps = {
  level: number,
  bonus: EffectiveBonus,
  berryRate: ProducingRateOfItem,
};
