import React from 'react';

import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {MapCommonProps, MapPageFilter} from '@/ui/sleepStyle/map/page/type';


export type MapUnlockAccumulatorOfSleepType = {[sleepType in PokemonSleepTypeId]?: number};

export type MapUnlockAccumulatorEnergy = {
  rank: SnorlaxRank,
  value: number | null,
};

export type MapUnlockAccumulator = {
  unlocked: MapUnlockAccumulatorOfSleepType,
  unlockable: MapUnlockAccumulatorOfSleepType,
  energy: {
    previous: MapUnlockAccumulatorEnergy | null,
    current: MapUnlockAccumulatorEnergy | null,
  },
};

export type MapUnlockTableRowProps = Pick<
  MapCommonProps,
  'mapId' | 'pokedexMap' | 'snorlaxReward' | 'isLoggedIn'
> & {
  filter: MapPageFilter,
  rank: SnorlaxRank,
  matchingStyles: SleepStyleNormalFlattened[],
  accumulator: MapUnlockAccumulator,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};
