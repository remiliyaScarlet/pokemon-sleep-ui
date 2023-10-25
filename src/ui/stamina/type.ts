import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  StaminaCalcConfig,
  StaminaEventLog,
  StaminaEventType,
  StaminaSkillTriggerData,
} from '@/types/game/producing/stamina';


export type StaminaEventLogFlattened = Omit<StaminaEventLog, 'stamina' | 'staminaUnderlying' | 'type'> & {
  stamina: number,
  staminaUnderlying: number,
  type: StaminaEventType | null,
  efficiency: number,
};

export type StaminaAnalysisConfig = {
  config: StaminaCalcConfig,
  skillTrigger: StaminaSkillTriggerData,
};

export type StaminaAnalysisDataProps = {
  preloaded: StaminaAnalysisConfig,
  subSkillMap: SubSkillMap,
};

export type StaminaAnalysisState = StaminaAnalysisConfig & {
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export type UseStaminaAnalysisReturn = {
  state: StaminaAnalysisState,
  setConfig: (updated: StaminaCalcConfig) => void,
  setSkillTrigger: (updated: StaminaSkillTriggerData) => void,
  setSubSkill: (updated: PokemonSubSkill) => void,
  setNature: (updated: NatureId | null) => void,
};
