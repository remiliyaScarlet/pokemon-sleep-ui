import React from 'react';

import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {SkillTriggerAnalysisState, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {GenerateSkillTriggerAnalysisUnitOpts} from '@/ui/team/mainskill/utils';


export type UseSkillTriggerAnalysisTargetStateReturn = {
  targetBottomRef: React.RefObject<HTMLDivElement>,
  state: SkillTriggerAnalysisState,
  setBase: (unit: SkillTriggerAnalysisUnit) => void,
  createUnit: (opts: GenerateSkillTriggerAnalysisUnitOpts) => void,
  updateUnit: (id: string, update: Partial<PokemonConfigPokemonData>) => void,
  deleteUnit: (id: string) => void,
  copyUnit: (id: string) => void,
};
