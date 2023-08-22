import {NatureEffectId, NatureEffectType} from '@/types/game/pokemon/nature';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {PokemonSpecialtyId} from '@/types/mongo/pokemon';


export const specialtyIdMap: {[name in SpecialtyType]: PokemonSpecialtyId} = {
  berry: 1,
  ingredient: 2,
  skill: 3,
};

export const specialtyImageSrcMap: {[id in PokemonSpecialtyId]: string} = {
  1: '/images/generic/berry.png',
  2: '/images/generic/ingredient.png',
  3: '/images/generic/skill.png',
};

export const natureEffectIdMap: {[type in NatureEffectType]: NatureEffectId} = {
  mainSkill: 1,
  exp: 2,
  energy: 3,
  frequencyOfIngredient: 4,
  frequencyOfBase: 5,
};
