import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';


type Props = {
  onClick?: () => void,
};

export const PopupClose = ({onClick}: Props) => {
  return (
    <button onClick={onClick} className="button-clickable-bg h-6 w-6">
      <XMarkIcon/>
    </button>
  );
};
