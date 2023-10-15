import React from 'react';

import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingRequest, RatingSetupData} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


export type RatingResultProps = {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  request: RatingRequest | undefined,
  berryDataMap: BerryDataMap,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  setRequest?: (updated: RatingRequest) => void,
};

export type RatingPopupControlState = {
  show: boolean,
  request: RatingRequest | undefined,
};

export type RatingPopupControl = {
  state: RatingPopupControlState,
  setState: React.Dispatch<React.SetStateAction<RatingPopupControlState>>,
  sendRequest: (setup: RatingSetupData) => void,
};
