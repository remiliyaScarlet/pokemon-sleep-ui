import {defaultMapBonus, defaultUserSettings} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {UserSettings} from '@/types/userData/settings';
import {cloneMerge} from '@/utils/object';
import {DeepPartial} from '@/utils/type';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

export const toEffectiveBonus = (settings: UserSettings): EffectiveBonus => {
  const {bonus} = settings;

  return {
    ingredient: bonus.ingredient,
    map: bonus.map[settings.currentMap] ?? defaultMapBonus,
    overall: bonus.overall,
  };
};
