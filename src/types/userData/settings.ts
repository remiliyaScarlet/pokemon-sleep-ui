import {UserBonus} from '@/types/game/bonus';
import {SleepMapId} from '@/types/game/sleepStyle';
import {Migratable} from '@/types/migrate';


export type UserSettings = Migratable & {
  bonus: UserBonus,
  currentMap: SleepMapId,
};
