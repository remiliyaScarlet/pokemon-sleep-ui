import {
  PokemonSubSkill,
  pokemonSubSkillLevel,
  SubSkillBonus,
  SubSkillData,
  SubSkillMap,
} from '@/types/game/pokemon/subskill';
import {combineIterator, permuteIterator} from '@/utils/compute';
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

export const hasHelperSubSkill = (opts: SubSkillCheckOpts): boolean => (
  getEffectiveSubSkills(opts).some(({bonus}) => !!bonus.helper)
);

type GeneratePossiblePokemonSubSkillOpts = {
  level: number,
  subSkillData: SubSkillData[],
};

export function* generatePossiblePokemonSubSkills({
  level,
  subSkillData,
}: GeneratePossiblePokemonSubSkillOpts): Generator<PokemonSubSkill> {
  const validLevels = pokemonSubSkillLevel
    .filter((subSkillLevel) => level >= subSkillLevel);

  if (!validLevels.length) {
    return {};
  }

  for (const combination of combineIterator(subSkillData, validLevels.length)) {
    for (const permutation of permuteIterator(combination)) {
      yield Object.fromEntries(
        permutation.map((data, idx) => [validLevels[idx], data]),
      );
    }
  }
}
