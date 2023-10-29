import React from 'react';

import {Nullable} from '@/utils/type';


export type NumberInputLayoutProps<TValue extends Nullable<number>> = {
  text: React.ReactNode,
  value: TValue,
  setValue: (value: TValue) => void,
  onClickDefault?: number,
  min?: number,
  max?: number,
  className?: string,
  textClassName?: string,
};
