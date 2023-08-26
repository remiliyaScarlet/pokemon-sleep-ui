import {IngredientLevel} from '@/types/game/pokemon/ingredient';
import {Dimension} from '@/types/style';


export type IngredientLevelIconCommonProps = {
  level: IngredientLevel,
  lvAsText?: boolean,
};

export type IngredientIconCommonProps = {
  dimension?: Dimension,
  noLink?: boolean,
};
