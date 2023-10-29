export type NumberInputRequiredProps = {
  value: number,
  min?: number,
  max?: number,
  setValue: (value: number) => void,
};

export type NumberSliderRequiredProps = NumberInputRequiredProps & {
  noSameLine?: boolean,
};
