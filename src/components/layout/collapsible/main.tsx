import React from 'react';

import {Transition} from '@headlessui/react';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex';


type Props = {
  state: ReturnType<typeof useCollapsible>,
  classNameForHeight: string,
  button: React.ReactNode,
  appear?: boolean,
};

export const Collapsible = ({state, button, appear, classNameForHeight, children}: React.PropsWithChildren<Props>) => {
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
          enterFrom="h-0"
          enterTo={classNameForHeight}
          leaveFrom={classNameForHeight}
          leaveTo="h-0"
          className="overflow-x-hidden overflow-y-scroll transition-[height] duration-300 ease-in-out"
        >
          <Transition.Child
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="transition-opacity duration-300 ease-in-out"
          >
            {children}
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </Flex>
  );
};
