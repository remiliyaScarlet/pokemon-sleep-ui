import {TeamAnalysisSetup, TeamAnalysisSingleTeam} from '@/types/teamAnalysis';


export type TeamAnalysisCompSelectorProps = {
  setup: TeamAnalysisSetup,
  onPicked: (selectedUuid: string) => void,
  onUpdated: (updated: TeamAnalysisSetup) => void,
  onDeleted: (deletedUuid: string) => void,
  onAdded: (newTeam: TeamAnalysisSingleTeam) => void,
  onCopied: (sourceUuid: string) => void,
};
