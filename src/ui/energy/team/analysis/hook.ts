import React from 'react';

import {ProductionStats, ProductionStatsBySlot, ProductionStatsSingle} from '@/ui/energy/team/analysis/type';
import {EnergyTeamFilter, EnergyTeamProps, EnergyTeamSlotNames, energyTeamSlotNames} from '@/ui/energy/team/type';
import {toSum} from '@/utils/array';
import {getPokemonBerryProductionRate} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


type UseProductionStatsOpts = EnergyTeamProps & {
  filter: EnergyTeamFilter,
};

type UseProductionStatsOfSlotOpts = UseProductionStatsOpts & {
  slotName: EnergyTeamSlotNames,
};

const useProductionStatsOfSlot = ({
  filter,
  slotName,
  pokedex,
  berryMap,
}: UseProductionStatsOfSlotOpts): ProductionStatsSingle | null => {
  return React.useMemo(() => {
    const {team, snorlaxFavorite} = filter;

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
  }, [filter.team[slotName]]);
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
      daily: toSum(energyTeamSlotNames
        .map((slotName) => bySlot[slotName])
        .filter(isNotNullish)
        .map(({berry}) => berry.daily)),
      weekly: toSum(energyTeamSlotNames
        .map((slotName) => bySlot[slotName])
        .filter(isNotNullish)
        .map(({berry}) => berry.weekly)),
    },
  }), Object.values(bySlot));

  return {bySlot, total};
};
