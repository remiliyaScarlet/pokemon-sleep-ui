import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {TeamMakerStatus} from '@/ui/team/maker/type/state';


export const teamMakerMaxResultCount = 15;

export const teamMakerCompCountWarningThreshold = 20000;

export const teamMakerCalcCompSegmentSize = 5000;

export const teamMakerStatusStyle: {[status in TeamMakerStatus]: string} = {
  standby: 'shadow-slate-700 text-slate-700 dark:shadow-slate-300 dark:text-slate-300',
  initializing: 'shadow-sky-600 text-sky-600 dark:shadow-sky-400 dark:text-sky-400',
  generatingTeams: 'shadow-sky-600 text-sky-600 dark:shadow-sky-400 dark:text-sky-400',
  calculating: 'shadow-amber-600 text-amber-600 dark:shadow-amber-500 dark:text-amber-500',
  completed: 'shadow-green-700 text-green-700 dark:shadow-green-500 dark:text-green-500',
  error: 'shadow-red-700 text-red-700 dark:shadow-red-500 dark:text-red-500',
};

export const teamMakerStatusI18nId: {
  [status in TeamMakerStatus]: I18nMessageKeysOfNamespace<'UI.InPage.Team.Maker'>
} = {
  standby: 'State.Status.Standby',
  initializing: 'State.Status.Initializing',
  generatingTeams: 'State.Status.GeneratingTeams',
  calculating: 'State.Status.Calculating',
  completed: 'State.Status.Completed',
  error: 'State.Status.Error',
};
