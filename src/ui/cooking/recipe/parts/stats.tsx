import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {CookingRecipePartsProps} from '@/ui/cooking/recipe/parts/type';
import {formatInt} from '@/utils/number/format';


export const CookingRecipeStats = ({info}: CookingRecipePartsProps) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" className="items-end justify-between">
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
        <div>
          {formatInt(info.strengthFinal)}
        </div>
      </Flex>
      <div>
        +{(info.bonusRate * 100 - 100).toFixed(1)}%
      </div>
    </Flex>
  );
};
