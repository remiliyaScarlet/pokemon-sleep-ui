import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/game/ingredient';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  ingredient: Ingredient | undefined,
};

export const PokemonIconsIngredientStats = ({level, ingredient, ...props}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      getProducingRate={(pokemon, qty) => getIngredientProducingRate({
        level,
        pokemon,
        ...defaultNeutralOpts,
        ingredient,
        count: qty,
        picks: getEffectiveIngredientLevels(level).length,
      })}
      getIcon={() => (
        <NextImage
          src={`/images/ingredient/${ingredient.id}.png`}
          alt={t(`Food.${ingredient.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      targetSpecialty={specialtyIdMap.ingredient}
      {...props}
    />
  );
};
