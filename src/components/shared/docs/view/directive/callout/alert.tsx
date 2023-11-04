import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {markdownCalloutClassName} from '@/components/shared/docs/view/directive/callout/const';
import {MarkdownCalloutLayout} from '@/components/shared/docs/view/directive/callout/layout';
import {MarkdownCalloutProps} from '@/components/shared/docs/view/directive/callout/type';


export const MarkdownCalloutAlert = (props: MarkdownCalloutProps) => {
  return (
    <MarkdownCalloutLayout
      className="text-rose-500 shadow-rose-500"
      icon={<ExclamationTriangleIcon className={markdownCalloutClassName}/>}
      {...props}
    />
  );
};
