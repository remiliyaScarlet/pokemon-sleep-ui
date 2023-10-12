import {SkillTriggerAnalysisDataProps, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export type SkillTriggerAnalysisCommonProps = SkillTriggerAnalysisDataProps;

export type SkillTriggerAnalysisCalculatedUnit = SkillTriggerAnalysisUnit & {
  id: string,
  skillTriggerValue: {
    actual: number,
    ratioToBase: number,
  },
};
