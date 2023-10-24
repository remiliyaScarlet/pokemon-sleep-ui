import React from 'react';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {IconPropsOfBase, IconPropsOfWrap} from '@/components/shared/icon/type';


export const LevelIcon = (props: Omit<IconPropsOfBase, 'alt'> & IconPropsOfWrap) => {
  return <GenericIconLarger src="/images/generic/lv.png" alt="Lv" {...props}/>;
};
