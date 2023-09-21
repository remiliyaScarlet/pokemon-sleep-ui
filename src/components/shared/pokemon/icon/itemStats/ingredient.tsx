import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats/item';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {EffectiveBonus} from '@/types/game/bonus';
import {Ingredient} from '@/types/game/ingredient';


type Props = PokemonIngredientStatsCommonProps & {
  level: number,
  bonus: EffectiveBonus,
  ingredient: Ingredient | undefined,
};

export const PokemonIconsIngredientStats = ({
  ingredient,
  ...props
}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      targetSpecialty={specialtyIdMap.ingredient}
      getItemRate={(pokemonRate) => pokemonRate.ingredient[ingredient.id]}
      getIcon={() => (
        <NextImage
          src={`/images/ingredient/${ingredient.id}.png`}
          alt={t(`Food.${ingredient.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      isProductionIncluded={(productions) => productions.some(({id}) => id === ingredient.id)}
      {...props}
    />
  );
};
