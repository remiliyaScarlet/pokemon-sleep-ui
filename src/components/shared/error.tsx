import React from 'react';


type Props = {
  valueError: React.ReactNode,
  className?: string,
};

export const ValueError = ({valueError, className}: Props) => {
  return (
    <span className={className}>
      &plusmn;&nbsp;{valueError}
    </span>
  );
};
