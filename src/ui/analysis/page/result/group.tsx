import React from 'react';

import {Flex} from '@/components/layout/flex';
import {AnalysisStatsGrouped} from '@/ui/analysis/page/calc/type';
import {AnalysisLayout} from '@/ui/analysis/page/result/layout';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {getMarkByThreshold} from '@/ui/analysis/page/result/utils';
import {formatFloat} from '@/utils/number';


type Props = {
  stats: AnalysisStatsGrouped,
  title: React.ReactNode,
  threshold?: AnalysisMarkThreshold,
};

export const AnalysisStatsGroupedUI = ({
  stats,
  title,
  threshold,
  children,
}: React.PropsWithChildren<Props>) => {
  const {totalCount, sharedCount} = stats;

  const isAvailable = sharedCount > 0;

  const ratio = sharedCount / totalCount;
  const rarity = 1 / ratio;

  return (
    <AnalysisLayout
      related={stats.related}
      title={title}
      mark={isAvailable ? getMarkByThreshold(rarity, threshold) : 'ordinary'}
      footer={
        <Flex direction="col" className="text-sm md:w-2/3">
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            <div>{sharedCount}</div>
            <div>/</div>
            <div>{totalCount}</div>
          </Flex>
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            {isAvailable ?
              <>
                <div>{(ratio * 100).toFixed(2)}%</div>
                <div>/</div>
                <div>1 in {formatFloat(rarity)}</div>
              </> :
              '-'}
          </Flex>
        </Flex>
      }
    >
      {children}
    </AnalysisLayout>
  );
};
