import {PokemonId} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';


export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisMember = {
  name?: string | null,
  level: number,
  pokemonId: PokemonId,
  ingredients: IngredientProductionAtLevels,
  nature: NatureId | null,
  subSkill: PokemonSubSkill,
  evolutionCount: number,
};

export type TeamAnalysisSetup = Migratable & {
  current: string,
};

export type TeamAnalysisSingleTeam = Migratable & {
  uuid: string,
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  analysisPeriod: ProductionPeriod,
  members: {[slot in TeamAnalysisSlotName]: TeamAnalysisMember | null},
};

export type TeamAnalysisSetup = {
  global: TeamAnalysisGlobalConfig,
  teams: {[uuid in string]: TeamAnalysisSingleTeam},
};
