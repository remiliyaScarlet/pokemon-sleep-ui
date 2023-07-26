import React from 'react';

import {useTranslations} from 'next-intl';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';
import {displayTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {PokedexInputRow} from '@/ui/pokedex/index/input/inputRow';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {getPokedexInputButtonClass} from '@/ui/pokedex/utils';


export const PokedexDisplayTypeSelector = ({filter, setFilter}: PokedexInputProps) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <PokedexInputRow>
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
              className={getPokedexInputButtonClass(active)}
            >
              {t(displayTypeToTranslationId[display])}
            </ToggleButton>
          );
        })}
      </Flex>
    </PokedexInputRow>
  );
};
