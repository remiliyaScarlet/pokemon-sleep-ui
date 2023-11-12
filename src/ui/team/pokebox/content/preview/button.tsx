import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import {FlexButton} from '@/components/layout/flex/button';


type Props = {
  message: string,
  onClick: () => void,
};

export const PokeboxPreviewButton = ({message, onClick}: Props) => {
  return (
    <FlexButton className="button-clickable-border info-highlight gap-1 p-1" onClick={onClick}>
      <EyeIcon className="h-6 w-6"/>
      <div>
        {message}
      </div>
    </FlexButton>
  );
};
