import {PokemonSubSkill, SubSkillBonus, SubSkillMap} from '@/types/game/pokemon/subskill';
import {isNotNullish} from '@/utils/type';


type SubSkillCheckOpts = {
  level: number,
  pokemonSubSkill: PokemonSubSkill,
  subSkillMap: SubSkillMap,
};

export const getEffectiveSubSkills = ({level, pokemonSubSkill, subSkillMap}: SubSkillCheckOpts) => {
  return Object.entries(pokemonSubSkill)
    .filter(([subSkillLv]) => parseInt(subSkillLv) >= level)
    .map(([_, subSkillId]) => subSkillId ? subSkillMap[subSkillId] : null)
    .filter(isNotNullish);
};

export const getSubSkillBonus = (opts: SubSkillCheckOpts): SubSkillBonus => {
  const effectiveSubSkills = getEffectiveSubSkills(opts);

  const ret: SubSkillBonus = {};

  for (const {bonus} of effectiveSubSkills) {
    for (const [bonusKeyString, bonusValue] of Object.entries(bonus)) {
      const bonusKey = bonusKeyString as keyof SubSkillBonus;

      ret[bonusKey] = (ret[bonusKey] ?? 0) + bonusValue;
    }
  }

  return ret;
};

export const hasHelperSubSkill = (opts: SubSkillCheckOpts): boolean => {
  const effectiveSubSkills = getEffectiveSubSkills(opts);

  return effectiveSubSkills.some(({bonus}) => !!bonus.helper);
};
