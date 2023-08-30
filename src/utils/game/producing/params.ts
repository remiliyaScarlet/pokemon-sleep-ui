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
    // 5 to account for full team bonus instead of "on self"
    helperCount: getSubSkillBonusValue(subSkillBonus, 'helper').length > 0 ? 5 : 0,
    subSkillBonus,
    natureId: nature,
  };
};
