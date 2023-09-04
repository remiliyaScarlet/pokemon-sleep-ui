import React from 'react';

import {GenericIcon} from '@/components/shared/icon/main';
import {IconProps} from '@/components/shared/icon/type';


export const ColoredEnergyIcon = (props: IconProps) => {
  return <GenericIcon src="/images/generic/energy.png" noInvert {...props}/>;
};
