import React from 'react';

import {Flex} from '@/components/layout/flex';
import {AnalysisStatsContinuous} from '@/ui/analysis/page/calc/type';
import {AnalysisLayout} from '@/ui/analysis/page/result/layout';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {getMarkByThreshold} from '@/ui/analysis/page/result/utils';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  stats: AnalysisStatsContinuous,
  title: React.ReactNode,
  threshold?: AnalysisMarkThreshold,
};

export const AnalysisStatsContinuousUI = ({stats, title, threshold, children}: React.PropsWithChildren<Props>) => {
  const {percentage, percentile, rank, totalCount} = stats;

  const isAvailable = rank !== null;

  return (
    <AnalysisLayout
      related={stats.related}
      title={title}
      mark={percentile ? getMarkByThreshold(percentile, threshold) : 'ordinary'}
      footer={
        <Flex direction="col" className="text-sm md:w-2/3">
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            <div>{isAvailable ? `#${rank}` : '-'}</div>
            <div>/</div>
            <div>{totalCount}</div>
          </Flex>
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            {isAvailable ?
              <>
                <div>{formatFloat(percentage)}%</div>
                <div>/</div>
                <div>{formatInt(percentile)}<sup>th</sup></div>
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
