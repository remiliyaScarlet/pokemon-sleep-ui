import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {IconPropsOfBase, IconPropsOfWrap} from '@/components/shared/icon/type';


export const SilverSeedIcon = (props: Omit<IconPropsOfBase, 'alt' | 'noInvert'> & IconPropsOfWrap) => {
  const t = useTranslations('Game');

  return <GenericIconLarger src="/images/generic/seed_silver.png" alt={t('Item.33')} noInvert {...props}/>;
};
