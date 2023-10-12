import {
  SkillTriggerComparerDataProps,
  SkillTriggerComparerState,
  SkillTriggerCompareUnit,
} from '@/ui/team/mainskill/type';


export type SkillTriggerAnalysisCommonProps = SkillTriggerComparerDataProps & {

};

export type SkillTriggerAnalysisState = SkillTriggerComparerState & {
  targets: {[id in string]: SkillTriggerCompareUnit},
};
