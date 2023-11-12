import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OcrImporterConfirm} from '@/components/ocr/importer/controls/confirm';
import {OcrImporterImagePreview} from '@/components/ocr/importer/controls/image';
import {OcrImporterProcessedImage} from '@/components/ocr/importer/controls/processed/main';
import {OcrImporterText} from '@/components/ocr/importer/controls/text';


type Props = {
  text: string,
  image: string | null,
  processed: ImageData | null,
  onConfirm: () => void,
  disableConfirm?: boolean,
};

export const OcrImporterControls = ({text, image, processed, onConfirm, disableConfirm}: Props) => {
  return (
    <Flex direction="row" className="justify-end gap-1.5">
      <OcrImporterImagePreview image={image}/>
      <OcrImporterProcessedImage processed={processed}/>
      <OcrImporterText text={text}/>
      <OcrImporterConfirm onClick={onConfirm} disabled={disableConfirm}/>
    </Flex>
  );
};
