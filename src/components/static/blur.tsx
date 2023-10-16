import React from 'react';

import {Transition} from '@headlessui/react';

import {blurStyle} from '@/styles/classes';


export const Blur = () => {
  return (
    <Transition.Child
      as={React.Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={blurStyle}/>
    </Transition.Child>
  );
};
