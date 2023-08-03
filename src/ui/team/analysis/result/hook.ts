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
import {getPokemonBerryProducingRate, getPokemonIngredientProducingRate} from '@/utils/game/pokemon';
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
        ...getPokemonBerryProducingRate({
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
          ...getPokemonIngredientProducingRate({
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
