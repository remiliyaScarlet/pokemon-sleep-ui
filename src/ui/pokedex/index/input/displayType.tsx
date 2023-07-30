import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInputRow} from '@/components/input/filter/inputRow';
import {getFilterInputButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';
import {displayTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';


export const PokedexDisplayTypeSelector = ({filter, setFilter}: PokedexInputProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <FilterInputRow>
      <Flex direction="row" className="gap-1" wrap>
        {pokedexDisplayType.map((display) => {
          const key = `displayType-${display}`;
          const active = filter.display === display;

          return (
            <ToggleButton
              key={key}
              id={key}
              active={active}
              onClick={() => setFilter((original) => ({
                ...original,
                display,
              }))}
              className={getFilterInputButtonClass(active)}
            >
              {t(displayTypeToTranslationId[display])}
            </ToggleButton>
          );
        })}
      </Flex>
    </FilterInputRow>
  );
};
