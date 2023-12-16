import {TeamMakerResult} from '@/ui/team/maker/type/result';


export type TeamMakerState = {
  status: 'standby' | 'error',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: null,
} | {
  status: 'initializing',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: null,
} | {
  status: 'generatingTeams',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: number,
} | {
  status: 'calculating',
  result: TeamMakerResult | null,
  teamCompsCalculated: number,
  teamCompsTotal: number,
} | {
  status: 'completed',
  result: TeamMakerResult,
  teamCompsCalculated: number,
  teamCompsTotal: number,
};

export type TeamMakerStatus = TeamMakerState['status'];
