import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/icon';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {IngredientTypeIcon} from '@/components/shared/pokemon/ingredientTypeIcon';
import {sleepTypeBgClass} from '@/styles/classes';
import {imageGallerySizes} from '@/styles/image';
import {PokedexDisplayTypeSelector} from '@/ui/pokedex/index/input/displayType';
import {PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexData} from '@/ui/pokedex/index/type';
import {isNotFalsy, toUnique} from '@/utils/array';
import {classNames} from '@/utils/react';


type Props = PokedexInputProps & {
  data: PokedexData,
};

export const PokedexInput = ({data, ...props}: Props) => {
  const {filter, setFilter} = props;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex direction="col" className="gap-1">
      <FilterIconInput
        title={t2('PokemonType')}
        idToItemId={(id) => `PokemonType-${id}`}
        ids={toUnique(data.map(({type}) => type)).sort((a, b) => a - b)}
        getAlt={(id) => t(`PokemonType.${id.toString()}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'type',
        })}
        {...props}
      />
      <FilterTextInput
        style="highlight"
        title={t2('Map')}
        idToItemId={(id) => `Map-${id}`}
        ids={toUnique(data.flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId))).sort((a, b) => a - b)}
        idToButton={(id) => {
          const mapName = t(`Field.${id.toString()}`);

          return (
            <>
              <div className="relative -mx-2 h-full w-28 md:w-40">
                <Image
                  src={`/images/field/${id}.png`} alt={mapName}
                  fill className="rounded-xl opacity-50 dark:opacity-25"
                  sizes={imageGallerySizes}
                />
              </div>
              <Flex direction="row" center className="absolute z-10 h-full">
                {mapName}
              </Flex>
            </>
          );
        }}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mapId',
        })}
        {...props}
      />
      <FilterTextInput
        style="highlight"
        title={t2('SleepType')}
        idToItemId={(id) => `SleepType-${id}`}
        ids={toUnique(data.map(({sleepType}) => sleepType)).sort((a, b) => a - b)}
        idToButton={(id) => (
          <Flex direction="row" className="gap-1" center>
            <div className={classNames('h-3 w-3 rounded-full', sleepTypeBgClass[id])}/>
            <div>{t(`SleepType.${id.toString()}`)}</div>
          </Flex>
        )}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'sleepType',
        })}
        {...props}
      />
      <FilterIconInput
        title={
          <Flex direction="row" center className="gap-1.5">
            <div className="h-5 w-5">
              <IngredientTypeIcon type="fixed"/>
            </div>
            <div>{t2('Ingredient')}</div>
          </Flex>
        }
        idToItemId={(id) => `IngredientFixed-${id}`}
        ids={toUnique(data.map(({ingredients}) => ingredients.fixed).filter(isNotFalsy)).sort((a, b) => a - b)}
        getAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientFixed',
        })}
        {...props}
      />
      <FilterIconInput
        title={
          <Flex direction="row" center className="gap-1.5">
            <div className="h-5 w-5">
              <IngredientTypeIcon type="random"/>
            </div>
            <div>{t2('Ingredient')}</div>
          </Flex>
        }
        idToItemId={(id) => `IngredientRandom-${id}`}
        ids={toUnique(data.flatMap(({ingredients}) => ingredients.random ?? [])).sort((a, b) => a - b)}
        getAlt={(id) => t(`Food.${id.toString()}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredientRandom',
        })}
        {...props}
      />
      <FilterIconInput
        title={t2('Berry')}
        idToItemId={(id) => `Berry-${id}`}
        ids={toUnique(data.map(({berry}) => berry.id)).sort((a, b) => a - b)}
        getAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'berryId',
        })}
        {...props}
      />
      <FilterTextInput
        title={t2('MainSkill')}
        idToItemId={(id) => `MainSkill-${id}`}
        ids={toUnique(data.map(({skill}) => skill)).sort((a, b) => a - b)}
        idToButton={(id) => t(`MainSkill.Name.${id.toString()}`)}
        {...getMultiSelectOnClickProps({
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
