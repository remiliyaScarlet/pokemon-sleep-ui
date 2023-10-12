import {
  SkillTriggerAnalysisDataProps,
  SkillTriggerAnalysisState,
  SkillTriggerAnalysisUnit,
} from '@/ui/team/mainskill/type';


export type SkillTriggerAnalysisCommonProps = SkillTriggerAnalysisDataProps;

export type SkillTriggerAnalysisTargetsState = SkillTriggerAnalysisState & {
  targets: {[id in string]: SkillTriggerAnalysisUnit},
};

export type SkillTriggerAnalysisCalculatedUnit = SkillTriggerAnalysisUnit & {
  id: string,
  skillTriggerValue: {
    actual: number,
    ratioToBase: number,
  },
};
