import React from 'react';

import {EffectiveBonus} from '@/types/game/bonus';
import {UserSettings} from '@/types/userData/settings';
import {cloneMerge} from '@/utils/object';
import {DeepPartial} from '@/utils/type';
import {toEffectiveBonus} from '@/utils/user/settings';


type UseEffectiveBonusOpts = {
  server: UserSettings,
  client: DeepPartial<UserSettings> | undefined,
};

export const useEffectiveBonus = ({server, client}: UseEffectiveBonusOpts): EffectiveBonus => {
  return React.useMemo(
    () => toEffectiveBonus(cloneMerge(server, client)),
    [client],
  );
};
