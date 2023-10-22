export type RatingBasisSelectionCommonProps<TRatingBasis> = {
  current: TRatingBasis,
  onSelect: (selected: TRatingBasis) => void,
  idPrefix: string,
};
