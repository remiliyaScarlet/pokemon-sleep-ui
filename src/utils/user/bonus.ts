import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export type ToEffectiveBonusOpts = {
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
    map: bonus.map[settings.currentMap] ?? defaultMapBonus,
    stamina: staminaEfficiency,
    overall: bonus.overall,
  };
};
