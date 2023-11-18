import {getMainSkillStrengthEffect} from '@/utils/game/mainSkill/effect/ofType/strength';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';


export const getMainSkillEquivalentStrengthOfSingle = (opts: GetMainSkillEquivalentStrengthOpts): number => {
  return getMainSkillStrengthEffect(opts);
};
