import React from 'react';

import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon';
import {getPokemonSleepStyleMap} from '@/controller/sleepStyle';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {RatingClient} from '@/ui/rating/client';
import {RatingServerDataProps} from '@/ui/rating/type';


export const Rating = () => {
  const pokedexMap = React.use(getPokemonAsMap());
  const sleepStyleMap = React.use(getPokemonSleepStyleMap());
  const ingredientChainMap = React.use(getIngredientChainMap());
  const ingredientMap = React.use(getAllIngredients());
  const berryDataMap = React.use(getAllBerryData());
  const subSkillMap = React.use(getSubSkillMap());
  const mapMeta = React.use(getAllMapMeta());
  const pokemonMaxLevel = React.use(getPokemonMaxLevelByBerry());

  const props: RatingServerDataProps = {
    pokedexMap,
    sleepStyleMap,
    ingredientChainMap,
    ingredientMap,
    berryDataMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
  };

  return (
    <PublicPageLayout>
      <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Pokedex.Info', 'UI.InPage.Team', 'UI.Metadata']}>
        <RatingClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
