import React from 'react';

import {ProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';
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
  TeamAnalysisSetup,
  teamAnalysisSlotName,
  TeamAnalysisSlotName,
} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {toSum} from '@/utils/array';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';
import {getPokemonProducingParams, getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {getSubSkillBonus, hasHelperSubSkill} from '@/utils/game/subSkill';
import {isNotNullish} from '@/utils/type';


type UseProducingStatsOpts = Omit<TeamAnalysisDataProps, 'settings'> & {
  setup: TeamAnalysisSetup,
  snorlaxFavorite: SnorlaxFavorite,
  calculatedSettings: CalculatedUserSettings,
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
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  subSkillMap,
  calculatedSettings,
}: UseProducingStatsOfSlotOpts): TeamProducingStatsSingle | null => {
  const currentTeam = getCurrentTeam({setup});

  return React.useMemo(() => {
    const member = currentTeam.members[slotName];
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

    const pokemonProducingRate = getPokemonProducingRate({
      ...producingRateOpts,
      ...calculatedSettings,
      level,
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      snorlaxFavorite,
      berryData,
      ingredients: getEffectiveIngredientLevels(level).map((level) => member.ingredients[level]),
      ingredientMap,
      evolutionCount: member.evolutionCount,
    });
    const {berry, ingredient} = pokemonProducingRate;

    const total = {
      // Total doesn't and shouldn't care about the quantity
      quantity: NaN,
      dailyEnergy: berry.dailyEnergy + toSum(Object.values(ingredient).map(({dailyEnergy}) => dailyEnergy)),
    };

    return {...pokemonProducingRate, total};
  }, [currentTeam.members[slotName], snorlaxFavorite, helperCount, calculatedSettings]);
};

export const useProducingStats = (opts: UseProducingStatsOpts): TeamProducingStats => {
  const {setup, snorlaxFavorite, subSkillMap, calculatedSettings} = opts;
  const currentTeam = getCurrentTeam({setup});
  const helperCount = Object.values(currentTeam.members)
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

  const deps: React.DependencyList = [setup, snorlaxFavorite, calculatedSettings];

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
      ingredient: groupProducingStats(stats.flatMap(({ingredient}) => Object.values(ingredient))),
    };
  }, deps);

  const overall: ProducingRate = React.useMemo(() => ({
    dailyEnergy: toSum(Object.values(total).flatMap((rate) => rate?.dailyEnergy).filter(isNotNullish)),
    quantity: toSum(Object.values(total).flatMap((rate) => rate?.quantity).filter(isNotNullish)),
  }), deps);

  return {bySlot, total, grouped, overall};
};
