import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';


type Props = {
  idPrefix: string,
  evolutionCount: number,
  maxEvolutionCount: number,
  setEvolutionCount: (evolutionCount: number) => void,
};

export const PokemonEvolutionCountInput = ({
  idPrefix,
  evolutionCount,
  maxEvolutionCount,
  setEvolutionCount,
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const text = t('Input.EvolutionCount');

  return (
    <FilterTextInput
      noFixedTitleWidth
      title={
        <Flex direction="row" className="items-center justify-end gap-0.5 px-2">
          <GenericIconLarger src="/images/generic/flash.png" alt={text}/>
          <div>{text}</div>
        </Flex>
      }
      idToItemId={(id) => `${idPrefix}-EvolutionStage-${id}`}
      idToButton={(id) => <div className="mx-1">{id}</div>}
      ids={[...new Array(maxEvolutionCount).keys()]}
      onClick={setEvolutionCount}
      isActive={(id) => evolutionCount === id}
    />
  );
};
