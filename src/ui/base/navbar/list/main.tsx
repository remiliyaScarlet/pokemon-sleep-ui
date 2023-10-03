import React from 'react';

import {NavListButton} from '@/ui/base/navbar/list/button';
import {NavListLayout} from '@/ui/base/navbar/list/layout';
import {NavListCommonProps} from '@/ui/base/navbar/list/type';


export const NavList = () => {
  const [open, setOpen] = React.useState(false);

  const props: NavListCommonProps = {
    open,
    setOpen,
  };

  return (
    <>
      <NavListButton {...props}/>
      <NavListLayout {...props}/>
    </>
  );
};
