import React from 'react';

import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';


type Props = {
  data: PokemonInfo[],
  level: number,
  ingredient: Ingredient | undefined,
};

export const PokemonIconsIngredientStats = ({data, level, ingredient}: Props) => {
  const t = useTranslations('Game');

  if (!ingredient) {
    return <></>;
  }

  return (
    <PokemonIconsItemStats
      data={data}
      getProducingRate={(pokemon) => getIngredientProducingRate({
        level,
        pokemon,
        ...defaultNeutralOpts,
        ingredient,
      })}
      getIcon={() => (
        <NextImage
          src={`/images/ingredient/${ingredient.id}.png`}
          alt={t(`Food.${ingredient.id}`)}
          sizes={imageSmallIconSizes}
        />
      )}
      targetSpecialty={specialtyIdMap.ingredient}
    />
  );
};
