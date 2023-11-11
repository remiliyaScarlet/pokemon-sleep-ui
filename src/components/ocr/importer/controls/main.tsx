import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OcrImporterConfirm} from '@/components/ocr/importer/controls/confirm';
import {OcrImporterImagePreview} from '@/components/ocr/importer/controls/image';
import {OcrImporterText} from '@/components/ocr/importer/controls/text';


type Props = {
  image: string | null,
  text: string,
  onConfirm: () => void,
  disableConfirm?: boolean,
};

export const OcrImporterControls = ({image, text, onConfirm, disableConfirm}: Props) => {
  return (
    <Flex direction="row" className="justify-end gap-1.5">
      <OcrImporterImagePreview image={image}/>
      <OcrImporterText text={text}/>
      <OcrImporterConfirm onClick={onConfirm} disabled={disableConfirm}/>
    </Flex>
  );
};
