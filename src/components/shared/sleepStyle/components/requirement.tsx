import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {getDrowsyScoreRequirementFromSpo} from '@/utils/game/sleepStyle';
import {formatInt} from '@/utils/number/format';


type Props = {
  spo: number,
  dimension?: Dimension,
};

export const SleepStyleDrowsyPowerRequirement = ({spo, dimension}: Props) => {
  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      <div className={clsx('relative', dimension ?? 'h-6 w-6')}>
        <NextImage
          src="/images/generic/snorlax.png"
          alt={t('DrowsyPower')}
          sizes={imageSmallIconSizes}
        />
      </div>
      <div>{formatInt(getDrowsyScoreRequirementFromSpo(spo))}+</div>
    </Flex>
  );
};
