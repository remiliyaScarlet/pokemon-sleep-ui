import React from 'react';

import DocumentMagnifyingGlassIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';

import {Flex} from '@/components/layout/flex';
import {FlexButton} from '@/components/layout/flexButton';
import {Ocr} from '@/components/ocr/main';
import {OcrCommonProps} from '@/components/ocr/type';
import {Popup} from '@/components/popup';
import {Dimension} from '@/types/style';


type Props<TData> = OcrCommonProps<TData> & {
  noFullWidth?: boolean,
  dimension?: Dimension,
};

export const OcrPopup = <TData, >({noFullWidth, dimension, ...props}: Props<TData>) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex direction="col" noFullWidth className="w-full sm:w-[70vw]">
          <Ocr {...props}/>
        </Flex>
      </Popup>
      <FlexButton
        center
        className="button-clickable-bg p-1"
        onClick={() => setShow(true)}
        noFullWidth={noFullWidth}
      >
        <div className={dimension ?? 'h-8 w-8'}>
          <DocumentMagnifyingGlassIcon/>
        </div>
      </FlexButton>
    </>
  );
};
