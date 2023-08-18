import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {TeamAnalysisMember} from '@/ui/team/analysis/type';


export type TeamAnalysisImporterCommonProps = {
  subSkillMap: SubSkillMap,
  onPokeboxPicked: (member: TeamAnalysisMember) => void,
};
