import {helpingBonusStackOfFullTeam} from '@/const/game/production';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus, PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill';


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
