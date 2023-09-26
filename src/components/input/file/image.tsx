import React from 'react';

import DocumentCheckIcon from '@heroicons/react/24/outline/DocumentCheckIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {InputFile} from '@/components/input/file/main';
import {InputFileCommonProps} from '@/components/input/file/type';
import {Flex} from '@/components/layout/flex';
import {mimeTypesOfImage} from '@/types/mime';
import {showToast} from '@/utils/toast';


export const InputFileImageOnly = (props: InputFileCommonProps) => {
  return (
    <InputFile
      {...props}
      accept={[...mimeTypesOfImage]}
      onFileTypeIncorrect={(fileType) => showToast({
        isAlert: true,
        content: (
          <Flex direction="row" className="items-center gap-1">
            <div className="h-6 w-6">
              <ExclamationTriangleIcon/>
            </div>
            <div>
              {fileType || '(N/A)'}
            </div>
            <div className="h-6 w-6">
              <DocumentCheckIcon/>
            </div>
            <div>
              {mimeTypesOfImage.join(' / ')}
            </div>
          </Flex>
        ),
      })}
    />
  );
};
