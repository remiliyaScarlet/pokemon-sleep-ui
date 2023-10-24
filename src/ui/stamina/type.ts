import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {StaminaCalcConfig, StaminaEventLog, StaminaEventType} from '@/types/game/producing/stamina';


export type StaminaEventLogFlattened = Omit<StaminaEventLog, 'stamina' | 'staminaUnderlying' | 'type'> & {
  stamina: number,
  staminaUnderlying: number,
  type: StaminaEventType | null,
};

export type StaminaAnalysisDataProps = {
  preloadedStaminaConfig: StaminaCalcConfig,
  subSkillMap: SubSkillMap,
};

export type StaminaAnalysisState = {
  config: StaminaCalcConfig,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type UseStaminaAnalysisReturn = {
  state: StaminaAnalysisState,
  setConfig: (updated: StaminaCalcConfig) => void,
  setSubSkill: (updated: PokemonSubSkill) => void,
  setNature: (updated: NatureId | null) => void,
};
