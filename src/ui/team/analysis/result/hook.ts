import React from 'react';

import {ProductionRate} from '@/types/game/pokemon';
import {
  TeamProductionStats,
  TeamProductionStatsBySlot,
  TeamProductionStatsGrouped,
  TeamProductionStatsSingle,
  TeamProductionStatsTotal,
} from '@/ui/team/analysis/result/type';
import {groupProductionStats} from '@/ui/team/analysis/result/utils';
import {
  TeamAnalysisDataProps,
  TeamAnalysisFilter,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
  TeamAnalysisTeamSetup,
} from '@/ui/team/analysis/type';
import {toSum} from '@/utils/array';
import {getPokemonBerryProductionRate, getPokemonIngredientProductionRate} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


type UseProductionStatsOpts = TeamAnalysisDataProps & {
  setup: TeamAnalysisTeamSetup,
  snorlaxFavorite: TeamAnalysisFilter['snorlaxFavorite'],
};

type UseProductionStatsOfSlotOpts = UseProductionStatsOpts & {
  slotName: TeamAnalysisSlotName,
};

const useProductionStatsOfSlot = ({
  setup,
  snorlaxFavorite,
  slotName,
  pokedex,
  berryMap,
  ingredientMap,
}: UseProductionStatsOfSlotOpts): TeamProductionStatsSingle | null => {
  return React.useMemo(() => {
    const slot = setup.team[slotName];
    if (!slot) {
      return null;
    }

    const pokemon = pokedex[slot.pokemonId];
    if (!pokemon) {
      return null;
    }

    const level = slot.level;
    const {berry, stats, ingredients} = pokemon;
    const berryData = berryMap[berry.id];
    const ingredient = ingredients.fixed;

    const overallMultiplier = 1 + (setup.bonus.overall / 100);

    return {
      berry: {
        id: berry.id,
        ...getPokemonBerryProductionRate({
          frequency: stats.frequency,
          level,
          berry,
          berryData,
          multiplier: (snorlaxFavorite[berryData.id] ? 2 : 1) * overallMultiplier,
        }),
      },
      ingredient: (ingredient ?
        {
          id: ingredient,
          ...getPokemonIngredientProductionRate({
            pokemon,
            ingredientData: ingredients.fixed ? ingredientMap[ingredients.fixed] : undefined,
            multiplier: (1 + (setup.bonus.ingredient / 100)) * overallMultiplier,
          }),
        } :
        null
      ),
    };
  }, [setup.team[slotName], snorlaxFavorite, setup.bonus]);
};

export const useProductionStats = (opts: UseProductionStatsOpts): TeamProductionStats => {
  const {setup, snorlaxFavorite} = opts;

  const bySlot: TeamProductionStatsBySlot = {
    A: useProductionStatsOfSlot({slotName: 'A', ...opts}),
    B: useProductionStatsOfSlot({slotName: 'B', ...opts}),
    C: useProductionStatsOfSlot({slotName: 'C', ...opts}),
    D: useProductionStatsOfSlot({slotName: 'D', ...opts}),
    E: useProductionStatsOfSlot({slotName: 'E', ...opts}),
  };

  const deps: React.DependencyList = [setup, snorlaxFavorite];

  const total: TeamProductionStatsTotal = React.useMemo(() => {
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

  const grouped: TeamProductionStatsGrouped = React.useMemo(() => {
    const stats = teamAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: groupProductionStats({stats, key: 'berry'}),
      ingredient: groupProductionStats({stats, key: 'ingredient'}),
    };
  }, deps);

  const overall: ProductionRate = React.useMemo(() => ({
    dailyEnergy: toSum(Object.values(total).flatMap((rate) => rate?.dailyEnergy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
