import React from 'react';

import {getServerSession} from 'next-auth';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getSingleMeal} from '@/controller/meal';
import {getPokemonAsMap, getPokemonByIngredients} from '@/controller/pokemon';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealMeta} from '@/ui/meal/page/meta';
import {MealPokemonOfIngredient} from '@/ui/meal/page/pokemon';
import {MealCommonProps} from '@/ui/meal/page/type';
import {createUserSettings} from '@/utils/user/settings';


type Props = {
  params: MealPageParams,
};

export const MealPage = async ({params}: Props) => {
  const {id, locale} = params;
  const meal = await getSingleMeal(Number(id));

  if (!meal) {
    return <Failed text="Meal"/>;
  }

  const [
    session,
    pokemonByIngredients,
    ingredientMap,
    pokedex,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonByIngredients(meal.ingredients.map(({id}) => id)),
    getAllIngredients(),
    getPokemonAsMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: MealCommonProps = {
    meal,
    ingredientMap,
    pokedex,
    pokemonMaxLevel,
    locale,
    preloadedSettings: createUserSettings(session?.user.preloaded?.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex direction="col" center className="gap-1.5">
        <MealMeta {...props}/>
        <AdsUnit/>
        <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
          <MealPokemonOfIngredient pokemonByIngredients={pokemonByIngredients} {...props}/>
        </I18nProvider>
      </Flex>
    </PublicPageLayout>
  );
};
