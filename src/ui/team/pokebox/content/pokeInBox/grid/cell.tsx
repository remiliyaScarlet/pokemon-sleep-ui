import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {imageIconSizes} from '@/styles/image';
import {PokeInBoxDetails} from '@/ui/team/pokebox/content/pokeInBox/grid/details/main';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxContentPokeInBoxCell = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    pokedexMap,
    displayType,
    onClick,
    snorlaxFavorite,
    bonus,
  } = props;
  const {pokemon: pokemonId} = pokeInBox;
  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');

  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const ratingControl = useRatingPopup();

  if (!pokemon) {
    return <></>;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    pokemon,
    displayType,
  };

  return (
    <div className="group relative w-full">
      <PokemonLinkPopup state={state} setState={setState}/>
      <RatingResultPopup
        pokemon={pokemon}
        ratingControl={ratingControl}
        {...props}
      />
      <Flex direction="col" noFullWidth className="absolute left-1 top-1 z-20 gap-1">
        <button className="button-clickable group h-6 w-6 rounded-full" onClick={() => showPokemon(pokemon)}>
          <GenericPokeballIcon alt={t2('Pokedex.Page.Title', {name: pokemonName})} noWrap/>
        </button>
        <button className="button-clickable group relative h-6 w-6" onClick={() => ratingControl.sendRequest({
          ...pokeInBox,
          pokemon,
          snorlaxFavorite,
          bonus,
        })}>
          <PokemonDataIcon src="/images/generic/search.png" alt={t2('Rating.Title')} invert/>
        </button>
      </Flex>
      <button onClick={onClick} className="button-clickable-bg w-full rounded-lg p-2">
        <Flex direction="row" className="relative h-24 gap-2">
          <div className="absolute bottom-0 right-0">
            <div className="relative h-16 w-16 opacity-50">
              <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
            </div>
          </div>
          <Flex direction="col" className="z-10 gap-1">
            <PokeInBoxMeta {...pokeInBoxProps}/>
            <div className="mt-auto">
              <PokeInBoxDetails {...pokeInBoxProps}/>
            </div>
          </Flex>
        </Flex>
      </button>
    </div>
  );
};
