import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {docsEditorDisplayTypeIcon} from '@/components/shared/docs/editor/const';
import {docsEditorDisplayType, DocsEditorDisplayType} from '@/components/shared/docs/editor/type';


type Props = {
  display: DocsEditorDisplayType,
  setDisplay: (updated: DocsEditorDisplayType) => void,
  className?: string,
};

export const DocsEditorDisplayToggle = ({display, setDisplay, className}: Props) => {
  return (
    <FilterTextInput
      onClick={(display) => setDisplay(display)}
      isActive={(current) => current === display}
      title={
        <Flex center>
          <PencilIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={[...docsEditorDisplayType]}
      idToButton={(display) => (
        <div className="h-6 w-6">
          {docsEditorDisplayTypeIcon[display]}
        </div>
      )}
      idToItemId={(display) => display}
      className={className}
    />
  );
};
