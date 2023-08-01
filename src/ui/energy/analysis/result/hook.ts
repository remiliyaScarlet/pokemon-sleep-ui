import React from 'react';

import {ProductionStats, ProductionStatsBySlot, ProductionStatsSingle} from '@/ui/energy/analysis/result/type';
import {
  EnergyAnalysisDataProps,
  EnergyAnalysisFilter,
  EnergyAnalysisSlotName,
  energyAnalysisSlotName,
  EnergyAnalysisTeamSelection,
} from '@/ui/energy/analysis/type';
import {toSum} from '@/utils/array';
import {getPokemonBerryProductionRate} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


type UseProductionStatsOpts = EnergyAnalysisDataProps & {
  team: EnergyAnalysisTeamSelection,
  snorlaxFavorite: EnergyAnalysisFilter['snorlaxFavorite'],
};

type UseProductionStatsOfSlotOpts = UseProductionStatsOpts & {
  slotName: EnergyAnalysisSlotName,
};

const useProductionStatsOfSlot = ({
  team,
  snorlaxFavorite,
  slotName,
  pokedex,
  berryMap,
}: UseProductionStatsOfSlotOpts): ProductionStatsSingle | null => {
  return React.useMemo(() => {
    const slot = team[slotName];
    if (!slot) {
      return null;
    }

    const pokemon = pokedex[slot.pokemonId];
    if (!pokemon) {
      return null;
    }

    const level = slot.level;
    const {berry, stats} = pokemon;
    const berryData = berryMap[berry.id];

    return {
      berry: getPokemonBerryProductionRate({
        frequency: stats.frequency,
        level,
        berry,
        berryData,
        multiplier: snorlaxFavorite[berryData.id] ? 2 : 1,
      }),
    };
  }, [team[slotName]]);
};

export const useProductionStats = (opts: UseProductionStatsOpts): ProductionStats => {
  const bySlot: ProductionStatsBySlot = {
    A: useProductionStatsOfSlot({slotName: 'A', ...opts}),
    B: useProductionStatsOfSlot({slotName: 'B', ...opts}),
    C: useProductionStatsOfSlot({slotName: 'C', ...opts}),
    D: useProductionStatsOfSlot({slotName: 'D', ...opts}),
    E: useProductionStatsOfSlot({slotName: 'E', ...opts}),
  };

  const total: ProductionStatsSingle = React.useMemo(() => ({
    berry: {
      daily: toSum(energyAnalysisSlotName
        .map((slotName) => bySlot[slotName])
        .filter(isNotNullish)
        .map(({berry}) => berry.daily)),
      weekly: toSum(energyAnalysisSlotName
        .map((slotName) => bySlot[slotName])
        .filter(isNotNullish)
        .map(({berry}) => berry.weekly)),
    },
  }), Object.values(bySlot));

  return {bySlot, total};
};
