import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';

import {markdownCalloutClassName} from '@/components/shared/docs/view/directive/callout/const';
import {MarkdownCalloutLayout} from '@/components/shared/docs/view/directive/callout/layout';
import {MarkdownCalloutProps} from '@/components/shared/docs/view/directive/callout/type';


export const MarkdownCalloutInfo = (props: MarkdownCalloutProps) => {
  return (
    <MarkdownCalloutLayout
      className="text-cyan-500 shadow-cyan-500"
      icon={<InformationCircleIcon className={markdownCalloutClassName}/>}
      {...props}
    />
  );
};
