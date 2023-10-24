import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {IconPropsOfBase, IconPropsOfWrap} from '@/components/shared/icon/type';


export const GoldSeedIcon = (props: Omit<IconPropsOfBase, 'alt'> & IconPropsOfWrap) => {
  const t = useTranslations('Game');

  return <GenericIconLarger src="/images/generic/seed_gold.png" alt={t('Item.32')} {...props}/>;
};
