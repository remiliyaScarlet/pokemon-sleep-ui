import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {formatFloat} from '@/utils/number';


type Props = {
  berry: number,
  ingredient: number,
  specialty: PokemonSpecialtyId | null,
};

const iconCommonClass = 'rounded-lg p-0.5';

export const PokemonProductionSplit = ({berry, ingredient, specialty}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  const berrySplit = berry / (berry + ingredient) * 100;
  const ingredientSplit = 100 - berrySplit;

  return (
    <Flex direction="row" center className="gap-1">
      <Flex direction="col" noFullWidth className={clsx(
        iconCommonClass, specialty === specialtyIdMap.berry && 'bg-blink',
      )}>
        <GenericBerryIcon alt={t('Berry')}/>
      </Flex>
      <Flex direction="col">
        <Flex direction="row" className="justify-between text-xs">
          <div>
            {formatFloat(berrySplit)}%
          </div>
          <div>
            {formatFloat(ingredientSplit)}%
          </div>
        </Flex>
        <Flex direction="row" className="transform-smooth flex h-2 rounded-full">
          <div className="transform-smooth h-2 rounded-l-lg bg-yellow-500" style={{width: `${berrySplit}%`}}/>
          <div className="transform-smooth h-2 rounded-r-lg bg-sky-500" style={{width: `${ingredientSplit}%`}}/>
        </Flex>
      </Flex>
      <Flex direction="col" noFullWidth className={clsx(
        iconCommonClass, specialty === specialtyIdMap.ingredient && 'bg-blink',
      )}>
        <GenericIngredientIcon alt={t('Ingredient')}/>
      </Flex>
    </Flex>
  );
};
