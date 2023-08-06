import {AnalysisMarkStyle, AnalysisMarkThreshold} from '@/ui/analysis/page/result/type';


export const getMarkByThreshold = (
  value: number,
  threshold: AnalysisMarkThreshold | undefined,
): AnalysisMarkStyle | undefined => {
  if (threshold?.superRare && value > threshold.superRare) {
    return 'superRare';
  }

  if (threshold?.rare && value > threshold.rare) {
    return 'rare';
  }

  if (threshold?.ordinary && value < threshold.ordinary) {
    return 'ordinary';
  }

  return undefined;
};
