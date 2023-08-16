import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonIconsItemStats} from '@/components/shared/pokemon/icon/itemStats';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {defaultNeutralOpts} from '@/utils/game/producing/const';
import {getIngredientProducingRate} from '@/utils/game/producing/ingredient';


type Props = {
  data: PokemonInfo[],
  level: number,
  ingredientMap: IngredientMap,
};

export const PokemonIconsIngredientStats = ({data, level, ingredientMap}: Props) => {
  const t = useTranslations('Game');

  return (
    <PokemonIconsItemStats
      data={data}
      getProducingRate={(pokemon) => getIngredientProducingRate({
        level,
        pokemon,
        ...defaultNeutralOpts,
        ingredient: pokemon.ingredients.fixed ? ingredientMap[pokemon.ingredients.fixed] : undefined,
      })}
      getIcon={({ingredients}) => (
        <>
          {ingredients.fixed ?
            <NextImage
              src={`/images/ingredient/${ingredients.fixed}.png`}
              alt={t(`Food.${ingredients.fixed}`)}
              sizes={imageSmallIconSizes}
            /> :
            <XCircleIcon/>}
        </>
      )}
      targetSpecialty={specialtyIdMap.ingredient}
    />
  );
};
