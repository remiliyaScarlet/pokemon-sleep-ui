import {TeamAnalysisConfig, TeamAnalysisComp} from '@/types/teamAnalysis';


export type TeamAnalysisDataCommonOpts = {
  userId: string,
};

export type TeamAnalysisConfigData = TeamAnalysisDataCommonOpts & TeamAnalysisConfig;

export type TeamAnalysisCompData = TeamAnalysisDataCommonOpts & TeamAnalysisComp;
