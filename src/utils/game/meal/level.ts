export const getMealLevelBonus = (level: number) => {
  // Level 1 should have level bonus of 1x instead of 1.02x
  return 1 + ((level - 1) * 0.02);
};
