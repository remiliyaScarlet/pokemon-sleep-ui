import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  onClick: () => void,
  disabled?: boolean,
  isSubmit?: boolean,
};

export const ClickableIconButton = ({onClick, disabled, isSubmit, children}: React.PropsWithChildren<Props>) => {
  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled relative h-8 w-14"
      onClick={isSubmit ? undefined : onClick}
      disabled={disabled}
      type={isSubmit ? 'submit' : 'button'}
    >
      <Flex center className="h-7">
        {children}
      </Flex>
    </button>
  );
};
