import {RatingBasis, RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const initialResult: Omit<RatingResultOfLevel, 'level'> = {
  samples: NaN,
  rank: NaN,
  percentage: NaN,
  percentile: NaN,
  baseDiffPercent: NaN,
  points: {
    min: null,
    current: null,
    max: null,
  },
};

export const ratingBasisI18nId: {
  [basis in RatingBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  totalProduction: 'Sort.TotalEnergy',
  ingredientCount: 'Sort.IngredientCount',
  ingredientProduction: 'Sort.IngredientEnergy',
  skillTriggerValue: 'Stats.MainSkillTriggerValue',
};

export const defaultRatingBasis: RatingBasis = 'totalProduction';
