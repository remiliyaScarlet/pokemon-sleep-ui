import React from 'react';

import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxRankInMap} from '@/types/game/snorlax';
import {TeamAnalysisSetup} from '@/types/teamAnalysis';
import {UserLazyLoadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';


export type TeamAnalysisPokemonFilter = PokemonInputFilter;

export type TeamAnalysisServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  snorlaxRankData: SnorlaxRankInMap[],
  mapMeta: FieldMetaMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  preloaded: UserLazyLoadedData['teamAnalysis'],
  maxEvolutionCount: number,
};

export type TeamAnalysisSetupModifyingProps = {
  setup: TeamAnalysisSetup,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
};
