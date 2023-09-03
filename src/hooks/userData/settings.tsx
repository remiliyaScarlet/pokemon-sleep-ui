import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

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
  return useCustomCompareMemo(
    () => toEffectiveBonus(cloneMerge(server, client)),
    [client],
    (prev, next) => isEqual(prev, next),
  );
};
