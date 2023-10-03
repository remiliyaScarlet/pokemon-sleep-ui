'use client';
import React from 'react';

import {Dialog, Transition} from '@headlessui/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PopupBlur} from '@/components/static/popupBlur';


type Props = {
  className?: string,
} & ({
  show: boolean,
  setShow: (show: boolean) => void,
} | {
  show?: never,
  setShow?: never,
});

export const Popup = ({show, setShow, children, className}: React.PropsWithChildren<Props>) => {
  return (
    <Transition.Root show={show ?? true} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setShow ? setShow(false) : void 0}>
        <PopupBlur/>
        <div className="transform-smooth fixed inset-0 flex items-center justify-center p-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className={clsx(
              'flex w-full flex-col justify-center rounded-lg sm:w-fit',
              'border border-slate-400 bg-slate-200 dark:bg-gray-950 dark:ring-gray-600',
              className,
            )}>
              <Flex direction="col" className="items-end rounded-t-lg bg-slate-500/20 p-2">
                <FlexButton onClick={() => setShow && setShow(false)} className={clsx(
                  'button-clickable-bg h-6 w-6',
                )}>
                  <XMarkIcon/>
                </FlexButton>
              </Flex>
              <div className="max-h-[70vh] w-full overflow-y-auto p-2">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
