import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonIngredientTypeTitle} from '@/components/shared/pokemon/ingredients/typeTitle';
import {pokemonIngredientInputToLevel, PokemonInputType} from '@/components/shared/pokemon/input/type';
import {isPokemonInputTypeOfIngredients} from '@/components/shared/pokemon/input/utils';


type Props = {
  type: PokemonInputType,
  lvAsText?: boolean,
};

export const PokemonFilterTitle = ({type, lvAsText}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  if (type === 'pokemonType') {
    return <>{t('PokemonType')}</>;
  }

  if (type === 'sleepType') {
    return <>{t('SleepType')}</>;
  }

  if (type === 'specialty') {
    return <>{t('Specialty')}</>;
  }

  if (type === 'berry') {
    return <>{t('Berry')}</>;
  }

  if (isPokemonInputTypeOfIngredients(type)) {
    return <PokemonIngredientTypeTitle level={pokemonIngredientInputToLevel[type]} lvAsText={lvAsText}/>;
  }

  if (type === 'mainSkill') {
    return <>{t('MainSkill')}</>;
  }

  if (type === 'evolutionStage') {
    return <>{t('Evolution')}</>;
  }

  throw new Error(`Unhandled pokemon filter title of type ${type satisfies never}`);
};
