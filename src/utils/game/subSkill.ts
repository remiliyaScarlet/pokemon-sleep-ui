import {
  GroupedSubSkillBonus,
  PokemonSubSkill,
  PokemonSubSkillLevel,
  pokemonSubSkillLevel,
  SubSkillBonus,
  SubSkillBonusCategory,
  SubSkillData,
  SubSkillId,
  SubSkillMap,
} from '@/types/game/pokemon/subskill';
import {combineIterator} from '@/utils/compute';
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
    yield {};
    return;
  }

  for (const combination of combineIterator(subSkillData, validLevels.length)) {
    yield Object.fromEntries(
      combination.map((data, idx) => [
        validLevels[idx] satisfies PokemonSubSkillLevel,
        data.id satisfies SubSkillId,
      ]),
    );
  }
}
