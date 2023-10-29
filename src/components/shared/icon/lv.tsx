import React from 'react';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {IconPropsOfBase, IconPropsOfWrap} from '@/components/shared/icon/type';


type Props = Omit<IconPropsOfBase, 'alt'> & IconPropsOfWrap & {
  alt?: string,
};

export const LevelIcon = ({alt, ...props}: Props) => {
  return <GenericIconLarger src="/images/generic/lv.png" alt={alt ?? 'Lv'} {...props}/>;
};
