import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';

import {NatureEffectDirection, NatureEffectId, NatureEffectType} from '@/types/game/pokemon/nature';


export const natureEffectIconMap: {[effect in NatureEffectDirection]: React.ReactNode} = {
  buff: <ChevronUpIcon/>,
  nerf: <ChevronDownIcon/>,
};

export const natureEffectIdMap: {[type in NatureEffectType]: NatureEffectId} = {
  mainSkill: 1,
  exp: 2,
  energy: 3,
  rateOfIngredient: 4,
  frequencyOfBase: 5,
};

export const natureIdEffectMap: {[effectId in NatureEffectId]: NatureEffectType} = {
  1: 'mainSkill',
  2: 'exp',
  3: 'energy',
  4: 'rateOfIngredient',
  5: 'frequencyOfBase',
};

export const natureEffectImageSrcMap: {[id in NatureEffectId]: string} = {
  1: '/images/generic/mainSkill.png',
  2: '/images/generic/exp.png',
  3: '/images/generic/mood.png',
  4: '/images/generic/ingredient.png',
  5: '/images/generic/speed.png',
};
