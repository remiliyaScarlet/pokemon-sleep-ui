import React from 'react';

import {ProductionRate, specialtyIdMap} from '@/types/game/pokemon';
import {
  EnergyProductionStats,
  EnergyProductionStatsBySlot,
  EnergyProductionStatsSingle,
} from '@/ui/energy/analysis/result/type';
import {
  EnergyAnalysisDataProps,
  EnergyAnalysisFilter,
  EnergyAnalysisSlotName,
  energyAnalysisSlotName,
  EnergyAnalysisTeamSetup,
} from '@/ui/energy/analysis/type';
import {toSum} from '@/utils/array';
import {getPokemonBerryProductionRate, getPokemonIngredientBaseProductionRate} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


type UseProductionStatsOpts = EnergyAnalysisDataProps & {
  setup: EnergyAnalysisTeamSetup,
  snorlaxFavorite: EnergyAnalysisFilter['snorlaxFavorite'],
};

type UseProductionStatsOfSlotOpts = UseProductionStatsOpts & {
  slotName: EnergyAnalysisSlotName,
};

const useProductionStatsOfSlot = ({
  setup,
  snorlaxFavorite,
  slotName,
  pokedex,
  berryMap,
  ingredientMap,
}: UseProductionStatsOfSlotOpts): EnergyProductionStatsSingle | null => {
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
    const {berry, stats, ingredients, specialty} = pokemon;
    const berryData = berryMap[berry.id];
    const ingredient = ingredients.fixed;

    const overallMultiplier = 1 + (setup.bonus.overall / 100);

    return {
      berry: getPokemonBerryProductionRate({
        frequency: stats.frequency,
        level,
        berry,
        berryData,
        multiplier: (snorlaxFavorite[berryData.id] ? 2 : 1) * overallMultiplier,
      }),
      ingredient: getPokemonIngredientBaseProductionRate({
        frequency: stats.frequency,
        ingredient,
        ingredientData: ingredient ? ingredientMap[ingredient] : undefined,
        quantity: specialty === specialtyIdMap.ingredient ? 2 : 1,
        multiplier: (1 + (setup.bonus.ingredient / 100)) * overallMultiplier,
      }),
    };
  }, [setup.team[slotName], snorlaxFavorite, setup.bonus]);
};

export const useProductionStats = (opts: UseProductionStatsOpts): EnergyProductionStats => {
  const {setup, snorlaxFavorite} = opts;

  const bySlot: EnergyProductionStatsBySlot = {
    A: useProductionStatsOfSlot({slotName: 'A', ...opts}),
    B: useProductionStatsOfSlot({slotName: 'B', ...opts}),
    C: useProductionStatsOfSlot({slotName: 'C', ...opts}),
    D: useProductionStatsOfSlot({slotName: 'D', ...opts}),
    E: useProductionStatsOfSlot({slotName: 'E', ...opts}),
  };

  const deps: React.DependencyList = [setup, snorlaxFavorite];

  const total: EnergyProductionStatsSingle = React.useMemo(() => {
    const stats = energyAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: {
        daily: toSum(stats.map(({berry}) => berry.daily)),
        weekly: toSum(stats.map(({berry}) => berry.weekly)),
      },
      ingredient: {
        daily: toSum(stats.map(({ingredient}) => ingredient.daily)),
        weekly: toSum(stats.map(({ingredient}) => ingredient.weekly)),
      },
    };
  }, deps);

  const overall: ProductionRate = React.useMemo(() => ({
    daily: toSum(Object.values(total).flatMap(({daily}) => daily)),
    weekly: toSum(Object.values(total).flatMap(({weekly}) => weekly)),
  }), deps);

  return {bySlot, total, overall};
};
