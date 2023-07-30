import React from 'react';

import {classNames} from '@/utils/react';


type Props = {
  className?: string,
};

export const VerticalSplitter = ({className}: Props) => {
  return <div className={classNames('border-r border-r-gray-600', className)}/>;
};

export const HorizontalSplitter = ({className}: Props) => {
  return <hr className={classNames('border-t-gray-600', className)}/>;
};
