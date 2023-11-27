import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getHelpingBonusSimulateOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


type GetRatingValueOfPossibilityOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'ingredients' | 'subSkill' | 'nature'
> & {
  override: {
    ingredients: IngredientProduction[],
    subSkill: PokemonSubSkill,
    nature: number,
  }
};

export const getRatingValueOfPossibility = ({override, ...opts}: GetRatingValueOfPossibilityOpts) => {
  const {
    level,
    basis,
    subSkillMap,
    mealMap,
    bundle,
  } = opts;
  const {nature, subSkill, ingredients} = override;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
    helpingBonusSimulateOnSelf: getHelpingBonusSimulateOnSelf(basis),
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ingredients,
      ...singleParams,
      ...toTranslatedSettings({
        ...bundle,
        mealMap,
        recoveryRate: toRecoveryRate(singleParams),
      }),
      noCap: ratingCalculationNoCap,
    }),
    singleParams,
  });
};
