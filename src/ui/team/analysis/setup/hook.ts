import React from 'react';

import {ProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {TeamAnalysisSetup, teamAnalysisSlotName, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {
  TeamProducingStats,
  TeamProducingStatsBySlot,
  TeamProducingStatsGrouped,
  TeamProducingStatsSingle,
  TeamProducingStatsTotal,
} from '@/ui/team/analysis/setup/type';
import {groupProducingStats} from '@/ui/team/analysis/setup/utils';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {toSum} from '@/utils/array';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {getSubSkillBonus, hasHelperSubSkill} from '@/utils/game/subSkill/effect';
import {isNotNullish} from '@/utils/type';


type UseProducingStatsOpts = Omit<TeamAnalysisDataProps, 'settings'> & {
  setup: TeamAnalysisSetup,
  calculatedSettings: CalculatedUserSettings,
};

type UseProducingStatsOfSlotOpts = UseProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
  helperCount: number,
};

const useProducingStatsOfSlot = ({
  setup,
  slotName,
  helperCount,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  subSkillMap,
  calculatedSettings,
}: UseProducingStatsOfSlotOpts): TeamProducingStatsSingle | null => {
  const {
    snorlaxFavorite,
    analysisPeriod,
    members,
  } = getCurrentTeam({setup});

  return React.useMemo(() => {
    const member = members[slotName];
    if (!member) {
      return null;
    }

    const pokemon = pokedexMap[member.pokemonId];
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

    const pokemonProducingRate = getPokemonProducingRate({
      ...producingRateOpts,
      ...calculatedSettings,
      period: analysisPeriod,
      level,
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      snorlaxFavorite,
      berryData,
      ingredients: getEffectiveIngredientProductions({level, ingredients: member.ingredients}),
      ingredientMap,
      evolutionCount: member.evolutionCount,
    });

    const total: ProducingRate = getTotalOfPokemonProducingRate({
      rate: pokemonProducingRate,
      state: stateOfRateToShow,
    });

    return {...pokemonProducingRate, total};
  }, [snorlaxFavorite, analysisPeriod, members[slotName], helperCount, calculatedSettings]);
};

export const useProducingStats = (opts: UseProducingStatsOpts): TeamProducingStats => {
  const {setup, subSkillMap, calculatedSettings} = opts;
  const {analysisPeriod, members} = getCurrentTeam({setup});
  const helperCount = Object.values(members)
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

  const deps: React.DependencyList = [setup, calculatedSettings];

  const total: TeamProducingStatsTotal = React.useMemo(() => {
    const stats = teamAnalysisSlotName
      .map((slotName) => bySlot[slotName])
      .filter(isNotNullish);

    return {
      berry: {
        period: analysisPeriod,
        energy: toSum(stats.map(({berry}) => berry.energy[stateOfRateToShow])),
        quantity: toSum(stats.map(({berry}) => berry.quantity[stateOfRateToShow])),
      },
      ingredient: {
        period: analysisPeriod,
        energy: toSum(
          stats
            .flatMap(({ingredient}) => (
              Object.values(ingredient).map(({energy}) => energy[stateOfRateToShow])
            ))
            .filter(isNotNullish),
        ),
        quantity: toSum(
          stats
            .flatMap(({ingredient}) => (
              Object.values(ingredient).map(({quantity}) => quantity[stateOfRateToShow])
            ))
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
      berry: groupProducingStats({
        period: analysisPeriod,
        rates: stats.map(({berry}) => berry),
      }),
      ingredient: groupProducingStats({
        period: analysisPeriod,
        rates: stats.flatMap(({ingredient}) => Object.values(ingredient)),
      }),
    };
  }, deps);

  const overall: ProducingRate = React.useMemo(() => ({
    period: analysisPeriod,
    energy: toSum(Object.values(total).flatMap((rate) => rate?.energy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
