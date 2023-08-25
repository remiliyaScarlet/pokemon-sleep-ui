import React from 'react';

import {AnalysisStatsAppearanceUI} from '@/ui/analysis/page/result/appearance';
import {AnalysisStatsLayout} from '@/ui/analysis/page/stats/layout';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';


export const AnalysisStatsOfSleepStyle = ({stats}: AnalysisStatsUiProps) => {
  return (
    <AnalysisStatsLayout>
      {stats.pokemon.sleepStyle.map((stats) => (
        <React.Fragment key={stats.mapId}>
          <AnalysisStatsAppearanceUI stats={stats.first} mapId={stats.mapId} i18nTitleKey="FirstAppearance"/>
          <AnalysisStatsAppearanceUI stats={stats.last} mapId={stats.mapId} i18nTitleKey="LastSleepStyle"/>
        </React.Fragment>
      ))}
    </AnalysisStatsLayout>
  );
};
