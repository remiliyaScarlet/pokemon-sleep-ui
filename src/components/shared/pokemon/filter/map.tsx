import React from 'react';

import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PremiumIcon} from '@/components/static/premium/icon';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {imageGallerySizes} from '@/styles/image';
import {textFilterButtonStyle} from '@/styles/input';
import {SleepMapId} from '@/types/game/sleepStyle';


type Props = FilterInputOnClickProps<SleepMapId> & {
  mapIds: SleepMapId[],
  highlight?: boolean,
  title?: React.ReactNode,
} & ({
  premiumOnly: true,
  session: Session | null,
} | {
  premiumOnly?: false,
  session?: never,
});

export const PokemonMapFilter = ({onClick, mapIds, highlight, title, premiumOnly, session, ...props}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');

  const {isPremium} = useUserActivation(session);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  return (
    <FilterExpandedInput
      style={highlight ? 'highlight' : undefined}
      title={title ?? t('Map')}
      ids={mapIds}
      idToButton={(id) => {
        const mapName = t2(`Field.${id}`);

        return (
          <>
            <div className="relative -mx-2 h-full w-40">
              <NextImage
                src={`/images/field/${id}.png`} alt={mapName}
                sizes={imageGallerySizes} className="rounded-lg opacity-50 dark:opacity-25"
              />
            </div>
            <Flex direction="row" center className="absolute z-10 h-full">
              {!isPremium && <PremiumIcon/>}
              <div>{mapName}</div>
            </Flex>
          </>
        );
      }}
      className={textFilterButtonStyle}
      onClick={(id) => {
        if (!isPremium) {
          showPremiumRequiredToast();
          return;
        }

        onClick(id);
      }}
      {...props}
    />
  );
};
