import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';

import {FlexButton} from '@/components/layout/flexButton';


type Props = {
  onClick: () => void,
};

export const OcrImporterConfirmButton = ({onClick}: Props) => {
  return (
    <FlexButton noFullWidth onClick={onClick} className="button-clickable-border w-fit self-end p-1">
      <div className="h-7 w-7">
        <CheckIcon/>
      </div>
    </FlexButton>
  );
};
