import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import {DocsEditorDisplayType} from '@/components/shared/docs/editor/type';


export const docsEditorDisplayTypeIcon: {[type in DocsEditorDisplayType]: React.ReactNode} = {
  markdown: <DocumentTextIcon/>,
  preview: <EyeIcon/>,
};

export const docsRelatedSeparator = ';';
