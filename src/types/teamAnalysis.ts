import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';


export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisMember = PokemonConfigPokemonData & {
  name?: string | null,
};

export type TeamAnalysisConfig = Migratable & {
  current: string,
};

export type TeamAnalysisComp = Migratable & {
  uuid: string,
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  analysisPeriod: ProductionPeriod,
  members: {[slot in TeamAnalysisSlotName]: TeamAnalysisMember | null},
};

export type TeamAnalysisSetup = {
  config: TeamAnalysisConfig,
  comps: {[uuid in string]: TeamAnalysisComp},
};

export type TeamMemberIdData = {
  uuid: string,
  slotName: TeamAnalysisSlotName,
};
