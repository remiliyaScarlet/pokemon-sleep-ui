import React from 'react';

import {Flex} from '@/components/layout/flex';
import {OcrImporterConfirm} from '@/components/ocr/importer/controls/confirm';
import {OcrImporterImagePreview} from '@/components/ocr/importer/controls/image';


type Props = {
  image: string | null,
  onConfirm: () => void,
};

export const OcrImporterControls = ({image, onConfirm}: Props) => {
  return (
    <Flex direction="row" className="justify-end gap-1.5">
      <OcrImporterImagePreview image={image}/>
      <OcrImporterConfirm onClick={onConfirm}/>
    </Flex>
  );
};
