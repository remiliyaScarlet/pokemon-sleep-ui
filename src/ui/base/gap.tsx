import React from 'react';


type Props = {
  show: boolean,
};

export const AdsGap = ({show}: Props) => {
  if (!show) {
    return null;
  }

  return <div className="min-h-[10rem]"/>;
};
