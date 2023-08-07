import React from 'react';

import {Flex} from '@/components/layout/flex';
import {AnalysisStatsContinuous, AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';
import {AnalysisLayout} from '@/ui/analysis/page/result/layout';
import {AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';
import {getMarkByThreshold} from '@/ui/analysis/page/result/utils';
import {formatFloat, formatInt} from '@/utils/number';


type Props<TData> = {
  stats: AnalysisStatsContinuous<TData>,
  title: React.ReactNode,
  renderData: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
  threshold?: AnalysisMarkThreshold,
};

export const AnalysisStatsContinuousUI = <TData, >({
  stats,
  title,
  renderData,
  threshold,
  children,
}: React.PropsWithChildren<Props<TData>>) => {
  const {percentage, percentile, rank, totalCount} = stats;

  const isAvailable = rank !== null;

  return (
    <AnalysisLayout
      linked={stats.linked}
      title={title}
      renderData={renderData}
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
