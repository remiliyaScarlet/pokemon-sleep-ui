import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {classNames} from '@/utils/react';


type Props = {
  dimension?: Dimension,
};

export const UnavailableIcon = ({dimension}: Props) => {
  return (
    <div className={classNames('relative', dimension ?? 'h-12 w-12')}>
      <NextImage
        src="/images/generic/pokeball_unavailable.png" alt="N/A"
        sizes={imageIconSizes} className="invert-hoverable"
      />
    </div>
  );
};
