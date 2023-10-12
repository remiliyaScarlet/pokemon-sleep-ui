import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


export type PokemonOnDeskState = {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  evolutionCount: number,
};

export type PokemonOnDeskDataProps = {
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  ocrTranslations: OcrTranslationsForPokemonInfo,
  maxEvolutionCount: number,
};

export type PokemonOnDeskCommonProps<TOnDesk extends PokemonOnDeskState> = PokemonOnDeskDataProps & {
  onRun: (setup: TOnDesk) => void,
  immediateUpdate?: boolean,
  renderAdditional: (onDesk: TOnDesk, setOnDesk: ReactStateUpdaterFromOriginal<TOnDesk>) => React.ReactNode,
};
