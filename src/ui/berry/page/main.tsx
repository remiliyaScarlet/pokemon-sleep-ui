import React from 'react';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {Failed} from '@/components/icons/failed';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokemonAsMap, getPokemonByBerry} from '@/controller/pokemon';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageCommonProps} from '@/ui/berry/page/type';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = parseInt(id);
  const berryData = React.use(getBerryData(idNumber));
  const favoriteInfo = React.use(getFavoriteInfoOfBerry(idNumber));
  const pokemonOfBerry = React.use(getPokemonByBerry(idNumber));
  const pokedex = React.use(getPokemonAsMap());

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: BerryPageCommonProps = {berryData, favoriteInfo, pokemonOfBerry, pokedex};

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game.Berry',
        'Game.Field',
        'Game.PokemonName',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Berry',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
