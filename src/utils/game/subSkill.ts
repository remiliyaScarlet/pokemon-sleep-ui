import {PokemonSubSkill, pokemonSubSkillLevel, SubSkillBonus, SubSkillMap} from '@/types/game/pokemon/subskill';
import {isNotNullish} from '@/utils/type';


type SubSkillCheckOpts = {
  level: number,
  pokemonSubSkill: PokemonSubSkill,
  subSkillMap: SubSkillMap,
};

export const getEffectiveSubSkills = ({level, pokemonSubSkill, subSkillMap}: SubSkillCheckOpts) => {
  return pokemonSubSkillLevel
    .map((subSkillLv) => {
      if (level < subSkillLv) {
        return null;
      }

      const subSkillId = pokemonSubSkill[subSkillLv];
      if (!subSkillId) {
        return null;
      }

      return subSkillMap[subSkillId];
    })
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
