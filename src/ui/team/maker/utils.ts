import {TeamMakerCalcStatus, TeamMakerResultComp} from '@/ui/team/maker/type';


export const isTeamMakerStatusLoading = (status: TeamMakerCalcStatus) => {
  return status !== 'standby' && status !== 'completed' && status !== 'error';
};

export const getTeamMakerResultCompId = (comp: TeamMakerResultComp): string => {
  return comp.rates.rates.map(({payload}) => payload.uuid).join('|');
};
