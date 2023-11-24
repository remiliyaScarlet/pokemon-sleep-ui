import React from 'react';

import {Grid} from '@/components/layout/grid';
import {activationSourceToText} from '@/const/activation/common';
import {activationSourceAll} from '@/types/mongo/activation';
import {ActivationStatsUnit} from '@/ui/admin/activation/stats/unit';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';
import {isExpiringSoon} from '@/ui/admin/activation/utils';
import {isActivationSource} from '@/utils/user/activation/type';


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
        title="Expiry T-3"
        filter={(data) => isExpiringSoon({data, now})}
        {...props}
      />
      {activationSourceAll.map((source) => (
        <ActivationStatsUnit
          key={source}
          title={activationSourceToText[source]}
          filter={(data) => data.source === source}
          {...props}
        />
      ))}
      <ActivationStatsUnit
        title="Paid"
        filter={({source}) => isActivationSource(source)}
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
