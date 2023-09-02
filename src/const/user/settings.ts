import {UserBonus} from '@/types/game/bonus';
import {UserSettings} from '@/types/userData/settings';


export const defaultUserBonus: UserBonus = {
  overall: 125,
  map: {},
  ingredient: 20,
};

export const defaultUserSettings: UserSettings = {
  bonus: defaultUserBonus,
  currentMap: 1,
  version: 1,
};
