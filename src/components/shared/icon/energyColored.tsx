import React from 'react';

import {GenericIconBase} from '@/components/shared/icon/base';
import {IconProps} from '@/components/shared/icon/type';


export const ColoredEnergyIcon = (props: IconProps) => {
  return <GenericIconBase src="/images/generic/energy.png" noInvert {...props}/>;
};
