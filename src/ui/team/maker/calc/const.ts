import {ProductionPeriod} from '@/types/game/producing/display';
import {teamMakerMemberCount} from '@/ui/team/maker/calc/type';


export const teamMakerProductionPeriod: ProductionPeriod = 'weekly';

export const teamMakerMaxMemberCount = Math.max(...teamMakerMemberCount);
