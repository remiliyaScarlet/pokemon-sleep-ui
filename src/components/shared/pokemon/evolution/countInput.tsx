import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {textFilterButtonStyle} from '@/styles/input';


type Props = {
  evolutionCount: number,
  maxEvolutionCount: number,
  setEvolutionCount: (evolutionCount: number) => void,
};

export const PokemonEvolutionCountInput = ({
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
      idToText={(id) => id.toString()}
      ids={[...new Array(maxEvolutionCount).keys()]}
      onClick={setEvolutionCount}
      isActive={(id) => evolutionCount === id}
      className={clsx('mx-1', textFilterButtonStyle)}
    />
  );
};
