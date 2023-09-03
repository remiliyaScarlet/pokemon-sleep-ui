import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';

import {UserSettingsPopup} from '@/ui/base/navbar/userSettings/popup';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';


export const UserSettingsUI = (props: UserSettingsProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <UserSettingsPopup show={show} setShow={setShow} {...props}/>
      <button className="button-clickable-bg nav-height w-8 p-1" onClick={() => setShow(true)}>
        <Cog6ToothIcon/>
      </button>
    </>
  );
};
