import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingBasis, RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
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

export const ratingBasisSpecialty: {[basis in RatingBasis]: PokemonSpecialtyId[]} = {
  totalProduction: [specialtyIdMap.berry, specialtyIdMap.ingredient],
  ingredientCount: [specialtyIdMap.ingredient],
  ingredientProduction: [specialtyIdMap.ingredient],
  skillTriggerValue: [specialtyIdMap.skill],
};

export const ratingBasisI18nId: {
  [basis in RatingBasis]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  totalProduction: 'Sort.TotalEnergy',
  ingredientCount: 'Sort.IngredientCount',
  ingredientProduction: 'Sort.IngredientEnergy',
  skillTriggerValue: 'Stats.MainSkillTriggerValue',
};

export const defaultRatingBasisOfSpecialty: {[specialty in SpecialtyType]: RatingBasis} = {
  berry: 'totalProduction',
  ingredient: 'ingredientCount',
  skill: 'skillTriggerValue',
};
