import {defaultMapBonus, defaultUserSettings} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

type ToEffectiveBonusOpts = {
  settings: UserSettings,
  skillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({settings, skillTriggers}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina, staminaSkillTrigger} = settings;

  const sessionInfo = getSleepSessionInfo(stamina.sleepSession);
  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    skillTriggers: skillTriggers ?? [staminaSkillTrigger],
    sessionInfo,
  });

  return {
    ingredient: bonus.ingredient,
    map: bonus.map[settings.currentMap] ?? defaultMapBonus,
    stamina: staminaEfficiency,
    overall: bonus.overall,
  };
};
