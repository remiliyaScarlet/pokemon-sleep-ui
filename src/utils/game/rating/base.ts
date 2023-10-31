import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {ratingCalculationNoCap} from '@/utils/game/rating/const';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getHelpingBonusSimulateOnSelf} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedUserSettings} from '@/utils/user/settings';


export const getRatingValueOfBase = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    level,
    basis,
    pokemon,
    subSkillMap,
    settings,
  } = opts;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill: {},
    nature: null,
    subSkillMap,
    helpingBonusSimulateOnSelf: getHelpingBonusSimulateOnSelf(basis),
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRate({
      ...opts,
      // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
      ...singleParams,
      ...toCalculatedUserSettings({
        settings,
        recoveryRate: toRecoveryRate(singleParams),
      }),
      noCap: ratingCalculationNoCap,
    }),
    singleParams,
  });
};
