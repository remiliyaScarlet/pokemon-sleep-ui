import React from 'react';

import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite, SnorlaxRankInMap} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';
import {UserLazyLoadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';


export type TeamAnalysisPokemonFilter = PokemonInputFilter;

export type TeamAnalysisServerDataProps = UsePokemonFilterCommonData & {
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  snorlaxRankData: SnorlaxRankInMap[],
  mapMeta: FieldMetaMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  preloadedSetup: UserLazyLoadedData['teamAnalysisSetup'] | null | undefined,
  maxEvolutionCount: number,
};

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

export type TeamAnalysisSingleTeam = {
  uuid: string,
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  members: {[slot in TeamAnalysisSlotName]: TeamAnalysisMember | null},
};

export type TeamAnalysisSetup = Migratable & {
  current: string,
  teams: {[uuid in string]: TeamAnalysisSingleTeam},
};

export type TeamAnalysisSetupModifyingProps = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
};
