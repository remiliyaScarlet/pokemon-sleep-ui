export type HelperBonusEffect = {
  context: 'team',
  stack: number,
} | {
  context: 'single',
  active: boolean,
};
