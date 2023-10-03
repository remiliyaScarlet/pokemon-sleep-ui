import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisCategoryData} from '@/ui/team/analysis/setup/summary/grouped/type';


type Props = {
  icon: React.ReactNode,
  data: TeamAnalysisCategoryData[],
  getReactNode: (id: number, rate: ProducingRate) => React.ReactNode,
};

export const TeamAnalysisCategorySummary = ({icon, data, getReactNode}: Props) => {
  return (
    <Flex direction="col" className="gap-2 md:flex-row">
      <Flex direction="col" center noFullWidth>
        <div className="relative h-10 w-10">
          {icon}
        </div>
      </Flex>
      <Flex direction="row" wrap center>
        {data.length ?
          data
            .sort((a, b) => (a.rate?.dailyEnergy ?? 0) - (b.rate?.dailyEnergy ?? 0))
            .map(({id, rate}) => {
              if (!rate) {
                return <React.Fragment key={id}/>;
              }

              return (
                <React.Fragment key={id}>
                  {getReactNode(id, rate)}
                </React.Fragment>
              );
            }) :
          <UnavailableIcon dimension="h-10 w-10"/>
        }
      </Flex>
    </Flex>
  );
};
