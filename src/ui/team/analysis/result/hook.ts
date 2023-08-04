import React from 'react';

import {ProducingRate} from '@/types/game/producing/rate';
import {
  TeamProducingStats,
  TeamProducingStatsBySlot,
  TeamProducingStatsGrouped,
  TeamProducingStatsSingle,
  TeamProducingStatsTotal,
} from '@/ui/team/analysis/result/type';
import {groupProducingStats} from '@/ui/team/analysis/result/utils';
import {
  TeamAnalysisDataProps,
  TeamAnalysisFilter,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';
import {toSum} from '@/utils/array';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {GetProducingRateChangeableOpts} from '@/utils/game/producing/type';
import {applyEnergyMultiplier} from '@/utils/game/producing/utils';
import {isNotNullish} from '@/utils/type';


type UseProducingStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

type UseProducingStatsOfSlotOpts = UseProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
};

const useProducingStatsOfSlot = ({
  setup,
  snorlaxFavorite,
  slotName,
  pokedex,
  berryMap,
  ingredientMap,
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
    const berryData = berryMap[pokemon.berry.id];
    const producingRateOpts: GetProducingRateChangeableOpts = {
      ...defaultNeutralOpts,
      natureId: member.nature,
    };

    const overallMultiplier = 1 + (setup.bonus.overall / 100);

    return {
      berry: applyEnergyMultiplier(overallMultiplier, getBerryProducingRate({
        level,
        pokemon,
        ...producingRateOpts,
        isSnorlaxFavorite: snorlaxFavorite[berryData.id] ?? false,
        berryData,
      })),
      ingredient: applyEnergyMultiplier(overallMultiplier, getIngredientProducingRate({
        level,
        pokemon,
        ...producingRateOpts,
        ingredientMap,
      })),
    };
  }, [setup.team[slotName], snorlaxFavorite, setup.bonus]);
};

export const useProducingStats = (opts: UseProducingStatsOpts): TeamProducingStats => {
  const {setup, snorlaxFavorite} = opts;

  const bySlot: TeamProducingStatsBySlot = {
    A: useProducingStatsOfSlot({slotName: 'A', ...opts}),
    B: useProducingStatsOfSlot({slotName: 'B', ...opts}),
    C: useProducingStatsOfSlot({slotName: 'C', ...opts}),
    D: useProducingStatsOfSlot({slotName: 'D', ...opts}),
    E: useProducingStatsOfSlot({slotName: 'E', ...opts}),
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
        dailyEnergy: toSum(stats.map(({ingredient}) => ingredient?.dailyEnergy).filter(isNotNullish)),
        quantity: toSum(stats.map(({ingredient}) => ingredient?.quantity).filter(isNotNullish)),
      },
    };
  }, deps);

  const grouped: TeamProducingStatsGrouped = React.useMemo(() => {
    const stats = teamAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: groupProducingStats({stats, key: 'berry'}),
      ingredient: groupProducingStats({stats, key: 'ingredient'}),
    };
  }, deps);

  const overall: ProducingRate = React.useMemo(() => ({
    dailyEnergy: toSum(Object.values(total).flatMap((rate) => rate?.dailyEnergy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
