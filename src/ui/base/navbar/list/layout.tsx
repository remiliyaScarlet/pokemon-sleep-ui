import React from 'react';

import {Dialog, Transition} from '@headlessui/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PopupBlur} from '@/components/static/popupBlur';
import {NavListContent} from '@/ui/base/navbar/list/content';
import {NavListCommonProps} from '@/ui/base/navbar/list/type';


export const NavListLayout = ({open, setOpen}: NavListCommonProps) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <PopupBlur/>
        <Transition.Child
          enter="duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className={clsx(
            'pointer-events-none fixed inset-y-0 left-0 flex w-full flex-row pr-10 transition ease-in-out',
          )}
        >
          <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
            <Flex noFullWidth className="absolute right-0 top-0 -mr-10 p-2">
              <FlexButton className="button-clickable" onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 w-6"/>
              </FlexButton>
            </Flex>
            <NavListContent/>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
