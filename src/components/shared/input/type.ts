export type LevelInputProps = {
  level: number,
  maxLevel: number,
  setLevel: (level: number) => void,
  minLevel?: number,
};

export type LevelSliderProps = LevelInputProps & {
  noSameLine?: boolean,
};
