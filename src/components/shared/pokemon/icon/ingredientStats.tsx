import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {EffectiveBonus} from '@/types/game/bonus';
import {Ingredient} from '@/types/game/ingredient';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredientLevel';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  ingredient: Ingredient | undefined,
  bonus: EffectiveBonus,
};

export const PokemonIconsIngredientStats = ({level, ingredient, bonus, ...props}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.ingredient}
      getProducingRate={(pokemon, qty) => getIngredientProducingRate({
        level,
        pokemon,
        ...defaultNeutralOpts,
        ingredient,
        bonus,
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
      {...props}
    />
  );
};
