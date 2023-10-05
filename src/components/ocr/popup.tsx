import React from 'react';

import DocumentMagnifyingGlassIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {Ocr} from '@/components/ocr/main';
import {OcrCommonProps} from '@/components/ocr/type';
import {Popup} from '@/components/popup';
import {Dimension} from '@/types/style';


type Props<TData> = OcrCommonProps<TData> & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  noFullWidth?: boolean,
  dimension?: Dimension,
};

export const OcrPopup = <TData, >({show, setShow, noFullWidth, dimension, ...props}: Props<TData>) => {
  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex noFullWidth className="w-full sm:w-[70vw]">
          <Ocr {...props}/>
        </Flex>
      </Popup>
      <FlexButton
        className="button-clickable-bg gap-0.5 px-1.5 py-1"
        onClick={() => setShow(true)}
        center
        noFullWidth={noFullWidth}
      >
        <div className={dimension ?? 'h-8 w-8'}>
          <DocumentMagnifyingGlassIcon/>
        </div>
        <div className="text-lg">
          OCR
        </div>
      </FlexButton>
    </>
  );
};
