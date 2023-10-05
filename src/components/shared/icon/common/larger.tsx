import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {GenericIconCommonProps} from '@/components/shared/icon/common/type';


export const GenericIconLarger = ({dimension, ...props}: Omit<GenericIconCommonProps, 'noWrap'>) => {
  return <GenericIcon {...props} dimension={dimension ?? 'h-6 w-6'}/>;
};
