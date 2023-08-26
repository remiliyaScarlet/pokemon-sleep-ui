export type NatureId = number;

export const natureEffectId = [
  1,
  2,
  3,
  4,
  5,
] as const;

export type NatureEffectId = typeof natureEffectId[number];

export const natureEffectType = [
  'mainSkill',
  'exp',
  'energy',
  'rateOfIngredient',
  'frequencyOfBase',
] as const;

export type NatureEffectType = typeof natureEffectType[number];

export type NatureData = {
  id: NatureId,
  buff: NatureEffectId | null,
  nerf: NatureEffectId | null,
};

export type NatureDataMap = {[id in NatureId]?: NatureData};
