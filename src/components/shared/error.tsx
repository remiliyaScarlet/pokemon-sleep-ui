import React from 'react';


type Props = {
  valueError: React.ReactNode,
};

export const ValueError = ({valueError}: Props) => {
  return (
    <>
      &plusmn;&nbsp;{valueError}
    </>
  );
};
