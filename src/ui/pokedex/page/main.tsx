import React from 'react';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getSinglePokemonInfo} from '@/controller/pokemon';
import {getPokemonSleepStyles} from '@/controller/sleepStyle';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle';
import {PokemonProps} from '@/ui/pokedex/page/type';


type Props = {
  params: PokedexPageParams,
};

export const Pokemon = ({params}: Props) => {
  const idNumber = Number(params.id);
  const pokemon = React.use(getSinglePokemonInfo(idNumber));
  const sleepStyles = React.use(getPokemonSleepStyles(idNumber));
  const berryData = React.use(getBerryData(pokemon?.berry.id));
  const ingredientMap = React.use(getAllIngredients());

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonProps = {pokemon, sleepStyles, berryData, ingredientMap};

  return (
    <PublicPageLayout>
      <Flex direction="col" center className="gap-2">
        <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Pokedex', 'UI.Metadata']}>
          <PokemonMeta {...props}/>
        </I18nProvider>
        <AdsUnit/>
        <PokemonSleepStyles {...props}/>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
