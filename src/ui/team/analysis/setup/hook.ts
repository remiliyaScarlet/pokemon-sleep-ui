import React from 'react';

import {ProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {
  TeamProducingStats,
  TeamProducingStatsBySlot,
  TeamProducingStatsGrouped,
  TeamProducingStatsSingle,
  TeamProducingStatsTotal,
} from '@/ui/team/analysis/setup/type';
import {groupProducingStats} from '@/ui/team/analysis/setup/utils';
import {
  TeamAnalysisDataProps,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';
import {toSum} from '@/utils/array';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';
import {getIngredientProducingRates} from '@/utils/game/producing/ingredients';
import {applyEnergyMultiplier} from '@/utils/game/producing/utils';
import {getSubSkillBonus, hasHelperSubSkill} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


type UseProducingStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  snorlaxFavorite: SnorlaxFavorite,
};

type UseProducingStatsOfSlotOpts = UseProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
  helperCount: number,
};

const useProducingStatsOfSlot = ({
  setup,
  snorlaxFavorite,
  slotName,
  helperCount,
  pokedex,
  berryDataMap,
  ingredientMap,
  subSkillMap,
}: UseProducingStatsOfSlotOpts): TeamProducingStatsSingle | null => {
  return React.useMemo(() => {
    const member = setup.team[slotName];
    if (!member) {
      return null;
    }

    const pokemon = pokedex[member.pokemonId];
    if (!pokemon) {
      return null;
    }
    const level = member.level;
    const berryData = berryDataMap[pokemon.berry.id];
    const producingRateOpts: ProducingRateSingleParams = {
      helperCount,
      subSkillBonus: getSubSkillBonus({
        level: member.level,
        pokemonSubSkill: member.subSkill,
        subSkillMap,
      }),
      natureId: member.nature,
    };

    const overallMultiplier = 1 + (setup.bonus.overall / 100);
    const ingredientMultiplier = 1 + (setup.bonus.ingredient / 100);

    const berry = applyEnergyMultiplier(overallMultiplier, getBerryProducingRate({
      level,
      pokemon,
      ...producingRateOpts,
      snorlaxFavorite,
      berryData,
    }));
    const ingredient = getIngredientProducingRates({
      level,
      pokemon,
      ingredients: getEffectiveIngredientLevels(level).map((level) => member.ingredients[level]),
      ingredientMap,
      multiplier: overallMultiplier * ingredientMultiplier,
      ...producingRateOpts,
    });
    const total = {
      // Total doesn't and shouldn't care about the quantity
      quantity: NaN,
      dailyEnergy: berry.dailyEnergy + toSum(ingredient.map(({dailyEnergy}) => dailyEnergy)),
    };

    return {berry, ingredient, total};
  }, [setup.team[slotName], snorlaxFavorite, helperCount, setup.bonus]);
};

export const useProducingStats = (opts: UseProducingStatsOpts): TeamProducingStats => {
  const {setup, snorlaxFavorite, subSkillMap} = opts;
  const helperCount = Object.values(setup.team)
    .filter((member) => {
      if (!member) {
        return false;
      }

      const {level, subSkill} = member;
      return hasHelperSubSkill({level, pokemonSubSkill: subSkill, subSkillMap});
    })
    .length;

  const bySlot: TeamProducingStatsBySlot = {
    A: useProducingStatsOfSlot({slotName: 'A', helperCount, ...opts}),
    B: useProducingStatsOfSlot({slotName: 'B', helperCount, ...opts}),
    C: useProducingStatsOfSlot({slotName: 'C', helperCount, ...opts}),
    D: useProducingStatsOfSlot({slotName: 'D', helperCount, ...opts}),
    E: useProducingStatsOfSlot({slotName: 'E', helperCount, ...opts}),
  };

  const deps: React.DependencyList = [setup, snorlaxFavorite];

  const total: TeamProducingStatsTotal = React.useMemo(() => {
    const stats = teamAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: {
        dailyEnergy: toSum(stats.map(({berry}) => berry.dailyEnergy)),
        quantity: toSum(stats.map(({berry}) => berry.quantity)),
      },
      ingredient: {
        dailyEnergy: toSum(
          stats
            .flatMap(({ingredient}) => Object.values(ingredient).map(({dailyEnergy}) => dailyEnergy))
            .filter(isNotNullish),
        ),
        quantity: toSum(
          stats
            .flatMap(({ingredient}) => Object.values(ingredient).map(({quantity}) => quantity))
            .filter(isNotNullish),
        ),
      },
    };
  }, deps);

  const grouped: TeamProducingStatsGrouped = React.useMemo(() => {
    const stats = teamAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: groupProducingStats(stats.map(({berry}) => berry)),
      ingredient: groupProducingStats(stats.flatMap(({ingredient}) => ingredient)),
    };
  }, deps);

  const overall: ProducingRate = React.useMemo(() => ({
    dailyEnergy: toSum(Object.values(total).flatMap((rate) => rate?.dailyEnergy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
