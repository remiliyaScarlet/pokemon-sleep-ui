export type NatureId = number;

export const natureEffectId = [
  1,
  2,
  3,
  4,
  5,
] as const;

export type NatureEffectId = typeof natureEffectId[number] | null;

export const natureEffectType = [
  'mainSkill',
  'exp',
  'energy',
  'frequencyOfIngredient',
  'frequencyOfBase',
] as const;

export type NatureEffectType = typeof natureEffectType[number];

export type NatureData = {
  id: NatureId,
  buff: number | null,
  nerf: number | null,
};
