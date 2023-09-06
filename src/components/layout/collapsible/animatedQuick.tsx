import React from 'react';

import {Transition} from '@headlessui/react';


type Props = {
  show: boolean,
  appear?: boolean,
};

export const AnimatedCollapseQuick = ({show, appear, children}: React.PropsWithChildren<Props>) => {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="duration-500"
      enterFrom="grid-rows-[0fr]"
      enterTo="grid-rows-[1fr]"
      leave="duration-500"
      leaveFrom="grid-rows-[1fr]"
      leaveTo="grid-rows-[0fr]"
      className="grid w-full transition-[grid-template-rows] ease-in-out"
    >
      <Transition.Child
        enter="duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="overflow-hidden transition-opacity ease-in-out"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
};
