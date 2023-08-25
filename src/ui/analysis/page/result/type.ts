import React from 'react';

import {AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';


export type AnalysisMarkStyle = 'rare' | 'superRare' | 'ordinary';

export type AnalysisMarkThreshold = {[mark in AnalysisMarkStyle]?: number};

export type AnalysisLayoutProps<TData> = {
  linked: AnalysisStatsLinkedData<TData>[],
  linkedIconKey: (data: AnalysisStatsLinkedData<TData>) => React.Key,
  title: React.ReactNode,
  footer: React.ReactNode,
  mark?: AnalysisMarkStyle,
  renderData?: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
};
