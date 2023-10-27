import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getHelpingBonusSimulateOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {overrideRecoveryRate, toCalculatedUserSettings} from '@/utils/user/settings';


export const getRatingValueOfCurrent = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    basis,
    settings,
  } = opts;

  const singleParams = getProducingRateSingleParams({
    ...opts,
    helpingBonusSimulateOnSelf: getHelpingBonusSimulateOnSelf(basis),
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRate({
      ...opts,
      ...singleParams,
      ...toCalculatedUserSettings({
        settings: overrideRecoveryRate({
          settings,
          recoveryRate: toRecoveryRate(singleParams),
        }),
      }),
      noCap: ratingCalculationNoCap,
    }),
    singleParams,
  });
};
