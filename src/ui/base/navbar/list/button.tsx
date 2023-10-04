import React from 'react';

import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import {FlexButton} from '@/components/layout/flex/button';
import {NavListCommonProps} from '@/ui/base/navbar/list/type';


export const NavListButton = ({setOpen}: NavListCommonProps) => {
  return (
    <FlexButton onClick={() => setOpen(true)} center className="button-clickable h-8 w-8 p-0.5">
      <Bars3Icon/>
    </FlexButton>
  );
};
