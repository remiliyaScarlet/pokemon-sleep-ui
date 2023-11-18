import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';


export const getMainSkillStrengthEffect = ({
  skillLevel,
  skillData,
}: GetMainSkillEquivalentStrengthOpts): number => {
  if (!skillData) {
    return 0;
  }

  const effect = skillData.effects[skillLevel - 1];
  const type = effect.type;

  if (type !== 'strength') {
    return 0;
  }

  if (effect.value) {
    return effect.value;
  }

  return ((effect.range?.from ?? 0) + (effect.range?.to ?? 0)) / 2;
};
