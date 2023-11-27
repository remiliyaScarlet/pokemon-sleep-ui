import React from 'react';

import {useSynergizedSettings} from '@/hooks/userData/synergized';
import {ProducingRate} from '@/types/game/producing/rate';
import {useTeamProducingStatsComp} from '@/ui/team/analysis/calcHook/comp';
import {useTeamProducingStatsTotal} from '@/ui/team/analysis/calcHook/total';
import {UseTeamProducingStatsOpts} from '@/ui/team/analysis/calcHook/type';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {toSum} from '@/utils/array';
import {hasHelperSubSkill} from '@/utils/game/subSkill/effect';
import {isNotNullish} from '@/utils/type';


export const useTeamProducingStats = (opts: UseTeamProducingStatsOpts): TeamProducingStats => {
  const {
    setup,
    subSkillMap,
    mealMap,
    bundle,
  } = opts;
  const {
    snorlaxFavorite,
    analysisPeriod,
    members,
  } = getCurrentTeam({setup});

  const helperCount = React.useMemo(() => Object.values(members)
    .filter((member) => {
      if (!member) {
        return false;
      }

      const {level, subSkill} = member;
      return hasHelperSubSkill({level, pokemonSubSkill: subSkill, subSkillMap});
    }).length,
  [members, subSkillMap],
  );
  const synergizedSettings = useSynergizedSettings({...bundle, mealMap});

  const deps: React.DependencyList = [snorlaxFavorite, analysisPeriod, members, setup, helperCount, bundle];

  const {
    bySlot,
    grouped,
  } = useTeamProducingStatsComp({
    period: analysisPeriod,
    state: stateOfRateToShow,
    deps,
    synergizedSettings,
    snorlaxFavorite,
    helperCount,
    ...opts,
  });

  const total = useTeamProducingStatsTotal({
    period: analysisPeriod,
    bySlot,
    state: stateOfRateToShow,
    deps,
  });

  const overall: ProducingRate = React.useMemo(() => ({
    period: analysisPeriod,
    energy: toSum(Object.values(total).flatMap((rate) => rate?.energy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
