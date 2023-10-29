import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {MealPreparerMealTypeStats} from '@/ui/cooking/prepare/mealType/type';
import {formatInt} from '@/utils/number/format';


type Props = {
  stats: MealPreparerMealTypeStats,
};

export const MealPreparerMealTypeStatsUI = ({stats}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" noFullWidth className="items-end justify-end gap-1.5 text-sm">
      <ColoredEnergyIcon dimension="h-8 w-8" alt={t('Energy')}/>
      <div>{t('Preparer.Total')}</div>
      <div className="text-2xl">{formatInt(stats.recipeOnly)}</div>
      <div>{t('Preparer.IncludeFiller')}</div>
      <div className="text-2xl">{formatInt(stats.withFiller)}</div>
    </Flex>
  );
};
