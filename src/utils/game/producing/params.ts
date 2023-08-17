import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subskill';
import {NatureId} from '@/types/game/producing/nature';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {getSubSkillBonus} from '@/utils/game/subSkill';


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
    helperCount: subSkillBonus.helper ? 1 : 0,
    subSkillBonus,
    natureId: nature,
  };
};
