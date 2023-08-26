import React from 'react';

import {TextMarkStyle} from '@/styles/text/mark/type';
import {AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';


export type AnalysisLayoutProps<TData> = {
  linked: AnalysisStatsLinkedData<TData>[],
  linkedIconKey: (data: AnalysisStatsLinkedData<TData>) => React.Key,
  title: React.ReactNode,
  footer: React.ReactNode,
  mark?: TextMarkStyle,
  renderData?: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
};
