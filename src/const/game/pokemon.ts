import {NatureEffectId, NatureEffectType} from '@/types/game/pokemon/nature';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {SubSkillBonusCategory} from '@/types/game/pokemon/subskill';
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

export const natureEffectImageSrcMap: {[id in NatureEffectId]: string} = {
  1: '/images/generic/skill.png',
  2: '/images/generic/exp.png',
  3: '/images/generic/mood.png',
  4: '/images/generic/ingredient.png',
  5: '/images/generic/speed.png',
};

export const subSkillBonusImageSrcMap: {[bonus in SubSkillBonusCategory]: string} = {
  exp: '/images/subSkill/exp.png',
  helper: '/images/subSkill/helper.png',
  stamina: '/images/subSkill/stamina.png',
  shard: '/images/subSkill/shard.png',
  research: '/images/subSkill/research.png',
  frequency: '/images/subSkill/frequency.png',
  berryCount: '/images/subSkill/berryCount.png',
  inventory: '/images/subSkill/inventory.png',
  skillLevel: '/images/subSkill/skillLevel.png',
  ingredientProbability: '/images/subSkill/ingredientProbability.png',
  mainSkillProbability: '/images/subSkill/mainSkillProbability.png',
};
