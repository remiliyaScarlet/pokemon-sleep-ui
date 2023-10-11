import {durationOfDay} from '@/const/common';


type GetMainSkillTriggerValueOpts = {
  skillValue: number,
  frequency: number,
};

export const getMainSkillTriggerValue = ({skillValue, frequency}: GetMainSkillTriggerValueOpts): number => (
  (durationOfDay / frequency) * skillValue
);
