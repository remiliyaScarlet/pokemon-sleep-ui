import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {PokemonProductionSplitInfo} from '@/components/shared/pokemon/production/split/info';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {specialtyIdMap} from '@/const/game/pokemon';


type Props = PokemonProductionSplitCommonProps & {
  berry: number,
  ingredient: number,
  mainSkill: number,
};

export const PokemonProductionSplit = ({
  specialty,
  className,
  berry,
  ingredient,
  mainSkill,
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  const total = (berry + ingredient + mainSkill);
  const berrySplit = berry / total * 100;
  const ingredientSplit = ingredient / total * 100;
  const mainSkillSplit = mainSkill / total * 100;

  return (
    <Flex center className={clsx('gap-1', className)}>
      <Flex direction="row" center className="justify-between text-xs">
        <PokemonProductionSplitInfo
          isHighlight={specialty === specialtyIdMap.berry}
          icon={<GenericBerryIcon alt={t('Berry')} dimension="h-4 w-4"/>}
          percent={berrySplit}
        />
        <PokemonProductionSplitInfo
          isHighlight={specialty === specialtyIdMap.ingredient}
          icon={<GenericIngredientIcon alt={t('Ingredient')} dimension="h-4 w-4"/>}
          percent={ingredientSplit}
        />
        <PokemonProductionSplitInfo
          isHighlight={specialty === specialtyIdMap.skill}
          icon={<GenericMainSkillIcon alt={t('MainSkill')} dimension="h-4 w-4"/>}
          percent={mainSkillSplit}
        />
      </Flex>
      <Flex direction="row" className="transform-smooth h-2 justify-between rounded-full bg-yellow-500">
        <div className="transform-smooth h-2 rounded-l-lg bg-green-500" style={{width: `${berrySplit}%`}}/>
        <div className="transform-smooth h-2 rounded-r-lg bg-sky-500" style={{width: `${mainSkillSplit}%`}}/>
      </Flex>
    </Flex>
  );
};
