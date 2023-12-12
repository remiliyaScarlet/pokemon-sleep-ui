import {SkillTriggerAnalysisDataProps, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export type SkillTriggerAnalysisCommonProps = SkillTriggerAnalysisDataProps;

export type SkillTriggerAnalysisCalcResult<TData> = {
  skillTriggerValue: TData,
  skillTriggerCount: TData | null,
};

export type SkillTriggerAnalysisCalculatedUnit = SkillTriggerAnalysisUnit & SkillTriggerAnalysisCalcResult<{
  actual: number,
  ratioToBase: number,
}> & {
  id: string,
};
