import {defaultNeutralOpts, helpingBonusStackOfFullTeam} from '@/const/game/production';
import {defaultSeedUsage} from '@/const/game/seed';
import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus, PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingRateImplicitParams, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetHelpingBonusStackOpts = {
  subSkillBonus: GroupedSubSkillBonus,
  helpingBonusSimulateOnSelf?: boolean,
};

export const getHelpingBonusStack = ({
  subSkillBonus,
  helpingBonusSimulateOnSelf,
}: GetHelpingBonusStackOpts) => {
  const helperBonusCount = getSubSkillBonusValue(subSkillBonus, 'helper').length;

  if (!helperBonusCount) {
    return 0;
  }

  if (helpingBonusSimulateOnSelf) {
    return helpingBonusStackOfFullTeam;
  }

  return helperBonusCount;
};

export type GetProducingRateSingleParamsOpts = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  subSkillMap: SubSkillMap,
  helpingBonusSimulateOnSelf?: boolean,
};

export const getProducingRateSingleParams = ({
  level,
  subSkill,
  nature,
  subSkillMap,
  helpingBonusSimulateOnSelf,
}: GetProducingRateSingleParamsOpts): ProducingRateSingleParams => {
  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});

  return {
    helperCount: getHelpingBonusStack({subSkillBonus, helpingBonusSimulateOnSelf}),
    subSkillBonus,
    natureId: nature,
  };
};

type GetProducingRateNeutralParamsOpts = {
  pokemon: PokemonInfo,
};

export const getProducingRateNeutralParams = ({
  pokemon,
}: GetProducingRateNeutralParamsOpts): ProducingRateSingleParams & ProducingRateImplicitParams => {
  return {
    ...defaultNeutralOpts,
    seeds: defaultSeedUsage,
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
  };
};

type GetProducingRateImplicitParamsFromPokeboxOpts = {
  pokeInBox: PokeInBox,
};

export const getProducingRateImplicitParamsFromPokeInbox = ({
  pokeInBox,
}: GetProducingRateImplicitParamsFromPokeboxOpts): ProducingRateImplicitParams => {
  const {seeds, evolutionCount} = pokeInBox;

  return {
    seeds: seeds ?? defaultSeedUsage,
    evolutionCount,
  };
};
