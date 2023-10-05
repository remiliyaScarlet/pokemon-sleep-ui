import React from 'react';

import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import {NavListCommonProps} from '@/ui/base/navbar/list/type';


export const NavListButton = ({setOpen}: NavListCommonProps) => {
  return (
    <button onClick={() => setOpen(true)} className="button-clickable nav-height w-8 p-1">
      <Bars3Icon/>
    </button>
  );
};
