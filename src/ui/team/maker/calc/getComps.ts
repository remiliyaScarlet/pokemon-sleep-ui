import {productionMultiplierByPeriod} from '@/const/game/production';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerIngredientStats} from '@/ui/team/maker/calc/ingredient';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {TeamMakerDataProps, TeamMakerInput, TeamMakerResult} from '@/ui/team/maker/type';
import {toSum} from '@/utils/array';
import {combineIterator} from '@/utils/compute';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {getTotalOfGroupedProducingRate} from '@/utils/game/producing/rateReducer';
import {getSnorlaxRankFinalEstimate} from '@/utils/game/rank';


type GetTeamMakerCompsOpts = TeamMakerDataProps & {
  input: TeamMakerInput,
  calculatedInput: TeamMakerInputCalculated,
  candidates: TeamMakerRateAtMaxPotentialData[],
};

export const getTeamMakerComps = ({
  input,
  calculatedInput,
  candidates,
  snorlaxRankData,
}: GetTeamMakerCompsOpts): TeamMakerResult[] => {
  const ret: TeamMakerResult[] = [];
  for (const ratesAtMax of combineIterator(candidates, 5)) {
    const rates = getPokemonProducingRateMulti({
      rateOpts: ratesAtMax.map(({calcOpts, pokeInBox}) => ({
        opts: calcOpts,
        payload: pokeInBox,
      })),
      sharedOpts: {
        snorlaxFavorite: input.snorlaxFavorite,
        period: teamMakerProductionPeriod,
        noCap: false,
      },
      groupingState: 'equivalent',
      ...calculatedInput,
    });
    const strengthByType = {
      berry: getTotalOfGroupedProducingRate({rate: rates.grouped.berry, key: 'energy'}),
      ingredient: getTotalOfGroupedProducingRate({rate: rates.grouped.ingredient, key: 'energy'}),
      skill: getTotalOfGroupedProducingRate({rate: rates.grouped.skill, key: 'energy'}),
    };
    const strengthTotal = toSum(Object.values(strengthByType));

    ret.push({
      rates,
      strength: {
        byType: strengthByType,
        total: strengthTotal,
      },
      ingredientStats: getTeamMakerIngredientStats({
        required: getMealIngredientInfoFromTargetMeals({
          targetMeals: calculatedInput.targetMeals,
          days: productionMultiplierByPeriod[teamMakerProductionPeriod],
        }).ingredientsRequired,
        inventory: input.ingredientCount,
        production: rates.grouped.ingredient,
      }),
      finalEstimates: getSnorlaxRankFinalEstimate({
        energy: strengthTotal,
        snorlaxRankData,
      }),
    });
  }

  return ret.sort((a, b) => b.strength.total - a.strength.total);
};
