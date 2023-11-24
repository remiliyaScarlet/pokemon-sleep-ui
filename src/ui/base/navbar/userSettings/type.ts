import {Session} from 'next-auth';

import {MealMap} from '@/types/game/meal/main';
import {SleepMapId} from '@/types/game/sleepStyle';


export type UserSettingsProps = {
  session: Session | null,
  mapIds: SleepMapId[],
  mealMap: MealMap,
};
