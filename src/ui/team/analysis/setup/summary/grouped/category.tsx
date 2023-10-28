import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisCategoryData} from '@/ui/team/analysis/setup/summary/grouped/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number/format';
import {isNotNullish} from '@/utils/type';


type Props = {
  icon: React.ReactNode,
  data: TeamAnalysisCategoryData[],
  getReactNode: (id: number, rate: ProducingRate) => React.ReactNode,
  showQuantity: boolean,
};

export const TeamAnalysisCategorySummary = ({icon, data, getReactNode, showQuantity}: Props) => {
  const quantity = toSum(data
    .map((row) => row.rate?.quantity)
    .filter(isNotNullish));

  return (
    <Flex className="gap-3 rounded-lg p-2 md:flex-row">
      <Flex direction="row" center noFullWidth className="md:flex-col">
        <div className="relative h-10 w-10">
          {icon}
        </div>
        {
          showQuantity &&
          <div className="text-sm">
            {formatFloat(quantity)}
          </div>
        }
      </Flex>
      <Flex direction="row" center wrap className="gap-1">
        {data.length ?
          data
            .sort((a, b) => (a.rate?.energy ?? 0) - (b.rate?.energy ?? 0))
            .map(({id, rate}) => {
              if (!rate) {
                return null;
              }

              return (
                <React.Fragment key={id}>
                  {getReactNode(id, rate)}
                </React.Fragment>
              );
            }) :
          <UnavailableIcon dimension="h-10 w-10"/>}
      </Flex>
    </Flex>
  );
};
