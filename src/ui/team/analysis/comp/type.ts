import {TeamAnalysisSetup, TeamAnalysisSingleTeam} from '@/ui/team/analysis/type';


export type TeamAnalysisCompSelectorProps = {
  setup: TeamAnalysisSetup,
  onPicked: (selectedUuid: string) => void,
  onUpdated: (updated: TeamAnalysisSetup) => void,
  onDeleted: (deletedUuid: string) => void,
  onAdded: (newTeam: TeamAnalysisSingleTeam) => void,
  onCopied: (sourceUuid: string) => void,
};
