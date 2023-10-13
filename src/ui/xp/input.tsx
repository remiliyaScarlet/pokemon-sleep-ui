import React from 'react';

import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {PokemonClickableIconImage} from '@/components/shared/pokemon/icon/clickable/image';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {isNotNullish} from '@/utils/type';


type Props = PokemonExpCalculatorDataProps & FilterInputProps<PokemonExpCalculatorInput> & {
  maxLevel: number,
};

export const PokemonExpCalculatorInputUI = ({
  xpMultiplier,
  pokedexMap,
  filter,
  setFilter,
  maxLevel,
}: Props) => {
  const {
    currentLv,
    currentToNext,
    ownedCandies,
    pokemon,
    nature,
    showNonBreakthroughLevel,
  } = filter;

  const t = useTranslations('UI.InPage.PokemonExp');

  return (
    <Flex className="info-section gap-1.5">
      <PokemonClickableIcons
        pokemonList={Object
          .values(xpMultiplier)
          .filter(isNotNullish)
          .sort((a, b) => a.pokemon - b.pokemon)
          .map(({pokemon}) => pokedexMap[pokemon])
          .filter(isNotNullish)}
        isActive={(id) => id === pokemon}
        onClick={({id}) => setFilter((original) => ({
          ...original,
          pokemon: id,
        } satisfies PokemonExpCalculatorInput))}
      >
        {(getClassName) => (
          <button className={getClassName(pokemon === null)} onClick={() => setFilter((original) => ({
            ...original,
            pokemon: null,
          }))}>
            <PokemonClickableIconImage pokemon={null} dimension="h-14 w-14"/>
          </button>
        )}
      </PokemonClickableIcons>
      <PokemonLevelSlider
        level={currentLv}
        maxLevel={maxLevel}
        setLevel={(currentLv) => setFilter((original) => ({
          ...original,
          currentLv,
        }))}
      />
      <InputRowWithTitle noFixedTitleWidth title={
        <div className="w-60">
          {t('ExpToNext')}
        </div>
      }>
        <InputBox
          type="number"
          value={currentToNext.toString()}
          onChange={({target}) => setFilter((original) => ({
            ...original,
            currentToNext: parseInt(target.value || '0'),
          }))}
        />
      </InputRowWithTitle>
      <InputRowWithTitle noFixedTitleWidth title={
        <div className="w-60">
          {t('OwnedCandies')}
        </div>
      }>
        <InputBox
          type="number"
          value={ownedCandies.toString()}
          onChange={({target}) => setFilter((original) => ({
            ...original,
            ownedCandies: parseInt(target.value || '0'),
          }))}
        />
      </InputRowWithTitle>
      <Flex className="h-8">
        <PokemonNatureSelector nature={nature} setNature={(nature) => setFilter((original) => ({
          ...original,
          nature,
        }))}/>
      </Flex>
      <InputRow>
        <Flex direction="row" noFullWidth className="ml-auto gap-2">
          <ToggleButton
            id="showEmpty"
            active={showNonBreakthroughLevel}
            onClick={() => setFilter((original) => ({
              ...original,
              showNonBreakthroughLevel: !original.showNonBreakthroughLevel,
            } satisfies PokemonExpCalculatorInput))}
            className={clsx('group', getTextFilterButtonClass(showNonBreakthroughLevel))}
          >
            <Flex direction="row" center noFullWidth className="gap-1.5 p-1">
              <div className="h-5 w-5">
                {showNonBreakthroughLevel ? <EyeIcon/> : <EyeSlashIcon/>}
              </div>
              <div className="h-5 w-5">
                <RocketLaunchIcon/>
              </div>
            </Flex>
          </ToggleButton>
        </Flex>
      </InputRow>
    </Flex>
  );
};
