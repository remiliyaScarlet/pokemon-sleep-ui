import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils';
import {Flex} from '@/components/layout/flex';
import {sleepTypeBgClass} from '@/styles/classes';
import {I18nNamespaces} from '@/types/i18n';
import {PokedexDisplayTypeSelector} from '@/ui/pokedex/index/input/displayType';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexData} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


const titleI18nNamespace: I18nNamespaces = 'UI.InPage.Pokedex.Info';

type Props = PokedexInputProps & {
  data: PokedexData,
};

export const PokedexInput = ({data, ...props}: Props) => {
  const {filter, setFilter} = props;
  const t = useTranslations('Game');

  return (
    <Flex direction="col" className="gap-1">
      <FilterIconInput
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="PokemonType"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.map(({type}) => type)).sort((a, b) => a - b)}
        getAlt={(id) => t(`PokemonType.${id.toString()}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'type',
        })}
        {...props}
      />
      <FilterTextInput
        highlight
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="Map"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId))).sort((a, b) => a - b)}
        idToButton={(id) => {
          const mapName = t(`Field.${id.toString()}`);

          return (
            <Flex direction="row" center noFullWidth className="w-28 md:w-40">
              <Image
                src={`/images/field/${id}.png`} alt={mapName}
                fill className="rounded-xl opacity-50 dark:opacity-25"
              />
              <Flex direction="row" center className="absolute z-10 h-full w-full">
                {mapName}
              </Flex>
            </Flex>
          );
        }}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mapId',
        })}
        {...props}
      />
      <FilterTextInput
        highlight
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="SleepType"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.map(({sleepType}) => sleepType)).sort((a, b) => a - b)}
        idToButton={(id) => (
          <Flex direction="row" className="gap-1" center>
            <div className={classNames('h-3 w-3 rounded-full', sleepTypeBgClass[id])}/>
            <div>{t(`SleepType.${id.toString()}`)}</div>
          </Flex>
        )}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'sleepType',
        })}
        {...props}
      />
      <FilterIconInput
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="Ingredient"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.flatMap(({ingredients}) => ingredients)).sort((a, b) => a - b)}
        getAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredient',
        })}
        {...props}
      />
      <FilterIconInput
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="Berry"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.map(({berry}) => berry.id)).sort((a, b) => a - b)}
        getAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'berryId',
        })}
        {...props}
      />
      <FilterTextInput
        titleI18nNamespace={titleI18nNamespace}
        titleI18nKey="MainSkill"
        idToItemId={(id) => id.toString()}
        ids={toUnique(data.map(({skill}) => skill)).sort((a, b) => a - b)}
        idToButton={(id) => t(`MainSkill.Name.${id.toString()}`)}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'skill',
        })}
        {...props}
      />
      <PokedexDisplayTypeSelector {...props}/>
    </Flex>
  );
};
