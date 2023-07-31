export type BerryId = number;

export type BerryLevelData = {
  lv: number,
  energy: number,
};

export type BerryData = {
  id: BerryId,
  energy: BerryLevelData[]
};
