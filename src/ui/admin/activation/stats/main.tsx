import React from 'react';

import {Grid} from '@/components/layout/grid';
import {durationOfDay} from '@/const/common';
import {UserActivationStatsUnit} from '@/ui/admin/activation/stats/unit';
import {UserActivationUiCommonProps} from '@/ui/admin/activation/type';


export const UserActivationStats = (props: UserActivationUiCommonProps) => {
  const now = new Date();

  return (
    <Grid center className="info-section grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
      <UserActivationStatsUnit
        title="Activated"
        filter={() => true}
        {...props}
      />
      <UserActivationStatsUnit
        title="Ads-Free"
        filter={({activation}) => !!activation.adsFree}
        {...props}
      />
      <UserActivationStatsUnit
        title="Premium"
        filter={({activation}) => !!activation.premium}
        {...props}
      />
      <UserActivationStatsUnit
        title="Expiry T-7"
        filter={({expiry}) => new Date(expiry).getTime() - now.getTime() < durationOfDay * 7 * 1000}
        {...props}
      />
      <UserActivationStatsUnit
        title="Discord"
        filter={({source}) => source === 'discord'}
        {...props}
      />
      <UserActivationStatsUnit
        title="Patreon"
        filter={({source}) => source === 'patreon'}
        {...props}
      />
      <UserActivationStatsUnit
        title="Paid"
        filter={({source}) => !!source}
        {...props}
      />
      <UserActivationStatsUnit
        title="Free"
        filter={({source}) => !source}
        {...props}
      />
    </Grid>
  );
};
