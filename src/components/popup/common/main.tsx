import React from 'react';

import {Dialog, Transition} from '@headlessui/react';

import {popupOverlayStyle, popupWindowStyle} from '@/components/popup/const';
import {PopupContent} from '@/components/popup/shared/content';
import {PopupProps} from '@/components/popup/type';
import {Blur} from '@/components/static/blur';


export const PopupCommon = (props: React.PropsWithChildren<PopupProps>) => {
  const {show, setShow} = props;

  return (
    <Transition.Root show={show ?? true} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setShow ? setShow(false) : void 0}>
        <Blur/>
        <div className={popupOverlayStyle}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className={popupWindowStyle}>
              <PopupContent {...props}/>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
