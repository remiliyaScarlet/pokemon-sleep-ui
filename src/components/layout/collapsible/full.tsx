import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {CollapsibleCommonProps} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex/common';


type Props = CollapsibleCommonProps & {
  disabled?: boolean,
};

export const CollapsibleFull = ({state, button, appear, disabled, children}: React.PropsWithChildren<Props>) => {
  const {show, setShow} = state;

  React.useEffect(() => {
    if (appear) {
      setShow(true);
    }
  }, []);

  return (
    <Flex>
      <button onClick={() => setShow(!show)} disabled={disabled} className={clsx(
        'button-clickable-bg disabled:button-disabled group p-1',
      )}>
        {button}
      </button>
      <Transition
        show={show}
        enterFrom="p-0"
        enterTo="p-1"
        leaveFrom="p-1"
        leaveTo="p-0"
        className="border-button-clickable rounded-b-lg border-x border-b transition-spacing duration-300 ease-in-out"
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
