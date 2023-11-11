import React from 'react';

import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';

import {markdownCalloutClassName} from '@/components/shared/docs/view/directive/callout/const';
import {MarkdownCalloutLayout} from '@/components/shared/docs/view/directive/callout/layout';
import {MarkdownCalloutProps} from '@/components/shared/docs/view/directive/callout/type';


export const MarkdownCalloutWarning = (props: MarkdownCalloutProps) => {
  return (
    <MarkdownCalloutLayout
      className="text-amber-600 shadow-amber-600 dark:text-amber-500 dark:shadow-amber-500"
      icon={<ExclamationCircleIcon className={markdownCalloutClassName}/>}
      {...props}
    />
  );
};
