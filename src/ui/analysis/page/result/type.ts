export type AnalysisMarkStyle = 'rare' | 'superRare' | 'ordinary';

export type AnalysisMarkThreshold = {[mark in AnalysisMarkStyle]?: number};
