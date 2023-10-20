import React from 'react';

import {Grid} from '@/components/layout/grid';
import {ActivationStatsUnit} from '@/ui/admin/activation/stats/unit';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';
import {isExpiringSoon} from '@/ui/admin/activation/utils';


export const ActivationStats = (props: ActivationUiCommonProps) => {
  const now = new Date();

  return (
    <Grid center className="info-section grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
      <ActivationStatsUnit
        title="Activated"
        filter={() => true}
        {...props}
      />
      <ActivationStatsUnit
        title="Ads-Free"
        filter={({activation}) => !!activation.adsFree}
        {...props}
      />
      <ActivationStatsUnit
        title="Premium"
        filter={({activation}) => !!activation.premium}
        {...props}
      />
      <ActivationStatsUnit
        title="Expiry T-7"
        filter={(data) => isExpiringSoon({data, now})}
        {...props}
      />
      <ActivationStatsUnit
        title="Discord"
        filter={({source}) => source === 'discord'}
        {...props}
      />
      <ActivationStatsUnit
        title="Patreon"
        filter={({source}) => source === 'patreon'}
        {...props}
      />
      <ActivationStatsUnit
        title="Paid"
        filter={({source}) => !!source}
        {...props}
      />
      <ActivationStatsUnit
        title="Free"
        filter={({source}) => !source}
        {...props}
      />
    </Grid>
  );
};
