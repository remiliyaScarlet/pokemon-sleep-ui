import {mainSkillMaxLevel} from '@/const/game/mainSkill';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {toSum} from '@/utils/array';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetMainSkillLevelOpts = {
  seedsUsed: number,
  evolutionCount?: number,
  subSkillBonus?: GroupedSubSkillBonus,
};

export const getMainSkillLevel = ({seedsUsed, evolutionCount, subSkillBonus}: GetMainSkillLevelOpts) => {
  return Math.min(
    mainSkillMaxLevel,
    1 + seedsUsed + (evolutionCount ?? 0) + (toSum(getSubSkillBonusValue(subSkillBonus, 'skillLevel')) ?? 0),
  );
};
