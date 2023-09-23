import {durationOfDay} from '@/const/common';
import {efficiencyDuringSleep} from '@/const/game/efficiency';
import {defaultMapBonus, defaultUserSettings} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {UserSettings} from '@/types/userData/settings';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';
import {cloneMerge} from '@/utils/object';
import {DeepPartial} from '@/utils/type';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

export const toEffectiveBonus = (settings: UserSettings): EffectiveBonus => {
  const {bonus, stamina} = settings;

  const sessionInfo = getSleepSessionInfo(stamina.sleepSession);
  const staminaDailyAverage = getStaminaEfficiency({config: stamina, sessionInfo});
  const totalSleepDuration = durationOfDay - sessionInfo.duration.awake;

  return {
    ingredient: bonus.ingredient,
    map: bonus.map[settings.currentMap] ?? defaultMapBonus,
    stamina: {
      sleep: efficiencyDuringSleep,
      awake: (
        (staminaDailyAverage * durationOfDay - efficiencyDuringSleep * totalSleepDuration) /
        (durationOfDay - totalSleepDuration)
      ),
    },
    overall: bonus.overall,
  };
};
