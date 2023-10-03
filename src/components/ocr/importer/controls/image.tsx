import React from 'react';

import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {Popup} from '@/components/popup';
import {NextImageAutoHeight} from '@/components/shared/common/image/autoHeight';


type Props = {
  image: string | null,
};

export const OcrImporterImagePreview = ({image}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Popup show={show} setShow={setShow}>
        <Flex noFullWidth className="w-full p-2 sm:w-[60vw]">
          {image && <NextImageAutoHeight src={image} alt="OCR"/>}
        </Flex>
      </Popup>
      <FlexButton
        noFullWidth
        onClick={() => setShow(true)}
        disabled={!image}
        className="button-clickable-border disabled:button-disabled w-fit self-end p-1"
      >
        <div className="h-6 w-6">
          <PhotoIcon/>
        </div>
      </FlexButton>
    </>
  );
};
