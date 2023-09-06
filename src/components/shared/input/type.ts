export type LevelSliderProps = {
  level: number,
  maxLevel: number,
  setLevel: (level: number) => void,
  noSameLine?: boolean,
  minLevel?: number,
};
