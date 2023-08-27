import React from 'react';

import {Transition} from '@headlessui/react';

import {CollapsibleCommonProps} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex';


type Props = CollapsibleCommonProps;

export const CollapsibleFull = ({state, button, appear, children}: React.PropsWithChildren<Props>) => {
  const {show, setShow} = state;

  React.useEffect(() => {
    if (appear) {
      setShow(true);
    }
  }, []);

  return (
    <Flex direction="col" className="border-button-clickable rounded-lg border">
      <Flex direction="col">
        <button className="button-clickable-bg group p-1" onClick={() => setShow(!show)}>
          {button}
        </button>
      </Flex>
      <Transition
        show={show}
        enterFrom="p-0"
        enterTo="p-1"
        leaveFrom="p-1"
        leaveTo="p-0"
        className="transition-spacing duration-300 ease-in-out"
      >
        <Transition.Child
          appear={appear}
          enter="duration-1000"
          enterFrom="grid-rows-[0fr]"
          enterTo="grid-rows-[1fr]"
          leave="duration-1000"
          leaveFrom="grid-rows-[1fr]"
          leaveTo="grid-rows-[0fr]"
          className="grid w-full transition-[grid-template-rows] ease-in-out"
        >
          <Transition.Child
            enter="delay-300 duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="overflow-hidden transition-opacity ease-in-out"
          >
            {children}
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </Flex>
  );
};
