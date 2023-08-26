import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subskill';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {getSubSkillBonus, getSubSkillBonusValue} from '@/utils/game/subSkill';


export type GetProducingRateSingleParamsOpts = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  subSkillMap: SubSkillMap,
};

export const getProducingRateSingleParams = ({
  level,
  subSkill,
  nature,
  subSkillMap,
}: GetProducingRateSingleParamsOpts): ProducingRateSingleParams => {
  const subSkillBonus = getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap});
  return {
    // Only care if `helper` exists on `subSkillBonus`
    helperCount: getSubSkillBonusValue(subSkillBonus, 'helper').length > 0 ? 1 : 0,
    subSkillBonus,
    natureId: nature,
  };
};
