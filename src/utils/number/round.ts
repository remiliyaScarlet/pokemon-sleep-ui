type RoundDownOpts = {
  value: number,
  decimals: number,
};

export const roundDown = ({value, decimals}: RoundDownOpts) => {
  const adjust = 10 ** decimals;

  if (value > 0) {
    return Math.floor(value * adjust) / adjust;
  }

  return Math.ceil(value * adjust) / adjust;
};
