import {TeamAnalysisSetup, TeamAnalysisComp} from '@/types/teamAnalysis';


export type TeamAnalysisCompSelectorProps = {
  setup: TeamAnalysisSetup,
  onPicked: (selectedUuid: string) => void,
  onUpdated: (updated: TeamAnalysisSetup) => void,
  onDeleted: (deletedUuid: string) => void,
  onAdded: (newTeam: TeamAnalysisComp) => void,
  onCopied: (sourceUuid: string) => void,
};
