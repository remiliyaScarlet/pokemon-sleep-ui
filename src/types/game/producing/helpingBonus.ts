export type HelpingBonusEffect = {
  context: 'team',
  stack: number,
} | {
  context: 'single',
  active: boolean,
};
