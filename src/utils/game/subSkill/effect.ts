import {
  GroupedSubSkillBonus,
  PokemonSubSkill,
  pokemonSubSkillLevel,
  SubSkillBonus,
  SubSkillBonusCategory,
  SubSkillMap,
} from '@/types/game/pokemon/subSkill';
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

export const getSubSkillBonus = (opts: SubSkillCheckOpts): GroupedSubSkillBonus => {
  const effectiveSubSkills = getEffectiveSubSkills(opts);

  const ret: GroupedSubSkillBonus = {};

  for (const {bonus} of effectiveSubSkills) {
    for (const [bonusKeyString, bonusValue] of Object.entries(bonus)) {
      const bonusKey = bonusKeyString as keyof SubSkillBonus;

      ret[bonusKey] = [...(ret[bonusKey] ?? []), bonusValue];
    }
  }

  return ret;
};

export const getSubSkillBonusValue = (
  bonus: GroupedSubSkillBonus | null | undefined,
  key: SubSkillBonusCategory,
): number[] => {
  if (!bonus) {
    return [];
  }

  return bonus[key] ?? [];
};

export const hasHelperSubSkill = (opts: SubSkillCheckOpts): boolean => (
  getEffectiveSubSkills(opts).some(({bonus}) => !!bonus.helper)
);
