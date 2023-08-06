import React from 'react';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getSinglePokemonInfo} from '@/controller/pokemon';
import {getPokemonSleepStyles} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokemonImageGallery} from '@/ui/pokedex/page/gallery';
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
    return <Loading text="Pokemon"/>;
  }

  if (!berryData) {
    return <Loading text="Berry"/>;
  }

  const props: PokemonProps = {pokemon, sleepStyles, berryData, ingredientMap};

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="mt-2 gap-2">
        <I18nProvider namespaces={['Game', 'UI.Common', 'UI.InPage.Pokedex']}>
          <PokemonMeta {...props}/>
          <PokemonImageGallery {...props}/>
        </I18nProvider>
        <PokemonSleepStyles {...props}/>
      </Flex>
    </PageLayout>
  );
};
