import React from 'react';

import {pick} from 'lodash';
import {NextIntlClientProvider, useLocale, useMessages} from 'next-intl';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {getSinglePokemonInfo} from '@/controller/pokemonInfo';
import {getPokemonSleepStyles} from '@/controller/sleepStyle';
import {PageLayout} from '@/ui/base/layout';
import {PokemonImageGallery} from '@/ui/pokedex/page/gallery';
import {PokemonMeta} from '@/ui/pokedex/page/meta';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle';
import {PokemonProps} from '@/ui/pokedex/page/type';


type Props = {
  params: PokedexPageParams,
};

export const Pokemon = ({params}: Props) => {
  const idNumber = Number(params.id);
  const pokemon = React.use(getSinglePokemonInfo(idNumber));
  const sleepStyles = React.use(getPokemonSleepStyles(idNumber));

  const locale = useLocale();
  const messages = useMessages();

  if (!pokemon) {
    return <Loading text="Pokemon"/>;
  }

  const props: PokemonProps = {pokemon, sleepStyles};

  return (
    <PageLayout>
      <Flex direction="row" center wrap className="mt-2 gap-2">
        <PokemonMeta {...props}/>
        {
          messages ?
            <NextIntlClientProvider
              locale={locale}
              messages={pick(messages, 'UI.Common', 'UI.InPage.Pokedex.Info', 'Game.SleepFace')}
            >
              <PokemonImageGallery {...props}/>
            </NextIntlClientProvider> :
            <Loading text="I18n"/>
        }
        <PokemonSleepStyles {...props}/>
      </Flex>
    </PageLayout>
  );
};
