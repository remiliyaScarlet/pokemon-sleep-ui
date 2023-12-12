import React from 'react';

import {clsx} from 'clsx';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIndividualSelectorButtonProps} from '@/components/shared/pokemon/selector/type';
import {PremiumIcon} from '@/components/static/premium/icon';
import {usePremiumRequiredToast} from '@/hooks/toast/main';


type Props = PokemonIndividualSelectorButtonProps & {
  setShow: (show: boolean) => void,
};

export const PokemonIndividualParamsSelectorButton = ({
  classNameForHeight,
  isPremium,
  requirePremium,
  setShow,
  children,
}: React.PropsWithChildren<Props>) => {
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  const noPremium = requirePremium && !isPremium;

  return (
    <FlexButton
      noFullWidth={false}
      center
      onClick={() => {
        if (noPremium) {
          showPremiumRequiredToast();
          return;
        }

        setShow(true);
      }}
      className={clsx(
        'button-clickable-bg group whitespace-nowrap px-1.5 text-sm',
        classNameForHeight ?? 'h-full',
      )}
    >
      {noPremium && <PremiumIcon/>}
      <Flex>{children}</Flex>
    </FlexButton>
  );
};
