import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {natureEffectIconMap} from '@/const/game/nature';
import {natureStyle} from '@/styles/game/nature';
import {NatureEffectDirection, NatureEffectId, natureEffectId} from '@/types/game/pokemon/nature';
import {NatureInfoEffectText} from '@/ui/info/nature/effectText';


type Props<
  TFilter extends FilterWithInclusionMap<NatureEffectId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, NatureEffectId> & {
  idPrefix: string,
  direction: NatureEffectDirection,
};

export const PokemonNatureEffectInput = <TFilter extends FilterWithInclusionMap<NatureEffectId>>({
  idPrefix,
  direction,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('UI.InPage.Team');

  return (
    <FilterTextInput
      title={
        <Flex direction="row" noFullWidth center className={clsx('gap-1', natureStyle[direction])}>
          <div className="h-4 w-4">
            {natureEffectIconMap[direction]}
          </div>
          <div>{t('NatureEffect')}</div>
        </Flex>
      }
      idToItemId={(id) => `${idPrefix}NatureEffect${direction}${id}`}
      idToButton={(id, isActive) => (
        <NatureInfoEffectText
          direction={direction}
          effectId={id}
          isActive={isActive}
        />
      )}
      ids={[...natureEffectId]}
      {...getMultiSelectOnClickProps(props)}
    />
  );
};
