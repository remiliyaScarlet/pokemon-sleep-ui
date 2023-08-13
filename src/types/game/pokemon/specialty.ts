export const specialtyType = [
  'berry',
  'ingredient',
  'skill',
] as const;

export type SpecialtyType = typeof specialtyType[number];
