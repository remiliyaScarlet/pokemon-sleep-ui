import {Session} from 'next-auth';

import {SleepMapId} from '@/types/game/sleepStyle';


export type UserSettingsProps = {
  session: Session,
  mapIds: SleepMapId[],
};
