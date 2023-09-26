import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';

import {FlexButton} from '@/components/layout/flexButton';


type Props = {
  onClick: () => void,
};

export const OcrImporterConfirm = ({onClick}: Props) => {
  return (
    <FlexButton noFullWidth onClick={onClick} className="button-clickable-border w-fit self-end p-1">
      <div className="h-6 w-6">
        <CheckIcon/>
      </div>
    </FlexButton>
  );
};
