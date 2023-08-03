import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imagePortraitSizes} from '@/styles/image';
import {ProducingRate} from '@/types/game/pokemon';
import {TeamAnalysisCategoryData} from '@/ui/team/analysis/result/summary/grouped/type';


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
      <Flex direction="row" center>
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
          <div className="relative h-10 w-10">
            <NextImage src="/images/generic/pokeball_unavailable.png" alt="N/A" sizes={imagePortraitSizes}/>
          </div>
        }
      </Flex>
    </Flex>
  );
};
