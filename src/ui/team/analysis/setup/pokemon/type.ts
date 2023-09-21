import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps, TeamAnalysisMember, TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type TeamAnalysisPokemonProps = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps & {
  setMember: (slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => void,
};
