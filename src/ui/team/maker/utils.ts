import {TeamMakerCalcStatus} from '@/ui/team/maker/type';


export const isTeamMakerStatusLoading = (status: TeamMakerCalcStatus) => {
  return status !== 'standby' && status !== 'completed' && status !== 'error';
};
