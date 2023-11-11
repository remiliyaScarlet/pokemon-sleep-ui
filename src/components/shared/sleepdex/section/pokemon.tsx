import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNameSmall} from '@/components/shared/pokemon/name/small';
import {SleepdexSectionSleepStyle} from '@/components/shared/sleepdex/section/style';
import {SleepdexSectionProps} from '@/components/shared/sleepdex/section/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {SleepStyleId} from '@/types/game/sleepStyle';


type Props = SleepdexSectionProps & {
  pokemon: PokemonInfo,
  sleepStyles: SleepStyleId[],
};

export const SleepdexPokemonInSection = (props: Props) => {
  const {
    pokemon,
    sleepStyles,
    showPokemon,
  } = props;

  const t = useTranslations('Game.PokemonName');
  const t2 = useTranslations('UI.Metadata');

  const pokemonId = pokemon.id;
  const pokemonName = t(pokemonId.toString());

  return (
    <Flex className="info-section relative items-center">
      <button onClick={() => showPokemon(pokemon)} className={clsx(
        'button-clickable group absolute right-2 top-2 h-6 w-6',
      )}>
        <GenericPokeballIcon alt={t2('Pokedex.Page.Title', {name: pokemonName})} noWrap/>
      </button>
      <PokemonNameSmall pokemon={pokemon} className="w-full justify-center"/>
      <div className="relative h-32 w-32">
        <PokemonImage
          pokemonId={pokemonId}
          isShiny={false}
          image={1}
        />
      </div>
      <Flex direction="row" wrap className="justify-center gap-1.5">
        {sleepStyles.map((styleId) => (
          <SleepdexSectionSleepStyle
            key={styleId}
            {...props}
            pokemonId={pokemonId}
            styleId={styleId}
          />
        ))}
      </Flex>
    </Flex>
  );
};
