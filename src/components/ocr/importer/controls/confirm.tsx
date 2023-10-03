import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import {FlexButton} from '@/components/layout/flex/button';


type Props = {
  onClick: () => void,
  disabled?: boolean,
};

export const OcrImporterConfirm = ({onClick, disabled}: Props) => {
  return (
    <FlexButton
      className="enabled:button-clickable-border disabled:button-disabled w-fit self-end p-1"
      noFullWidth disabled={disabled} onClick={onClick}
    >
      <div className="h-6 w-6">
        {disabled ? <XMarkIcon/> : <CheckIcon/>}
      </div>
    </FlexButton>
  );
};
