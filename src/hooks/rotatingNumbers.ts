import React from 'react';


type UseRotatingNumbersOpts = {
  max: {[key in string]: number},
  interval: number,
};

export const useRotatingNumbers = ({max, interval}: UseRotatingNumbersOpts) => {
  const [idx, setIdx] = React.useState(
    Object.fromEntries(Object.keys(max).map((key) => [key, 0])),
  );

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIdx((original) => Object.fromEntries(
        Object.entries(original).map(([key, counter]) => [key, (counter + 1) % max[key]]),
      )),
      interval,
    );

    return () => clearInterval(intervalId);
  }, []);

  return {idx, setIdx};
};
