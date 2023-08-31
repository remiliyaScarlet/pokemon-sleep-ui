import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {imageIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
};

export const PokeInBoxTableRowHeader = ({pokemon, ...props}: Props) => {
  const {pokeInBox, snorlaxFavorite, bonus} = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const ratingControl = useRatingPopup();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');

  const pokemonId = pokemon.id;
  const pokemonName = t(`PokemonName.${pokemonId}`);

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <RatingResultPopup
        pokemon={pokemon}
        ratingControl={ratingControl}
        {...props}
      />
      <Flex direction="row" center noFullWidth className={clsx(
        'sticky left-0 z-10 rounded-lg bg-slate-100 p-1',
        'shadow shadow-white dark:bg-slate-800 dark:shadow-black',
      )}>
        <button className="button-clickable group relative h-6 w-6" onClick={() => showPokemon(pokemon)}>
          <GenericPokeballIcon alt={t2('Pokedex.Page.Title', {name: pokemonName})} noWrap/>
        </button>
        <div className="relative h-10 w-10">
          <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
        </div>
        <button className="button-clickable group relative h-6 w-6" onClick={() => ratingControl.sendRequest({
          ...pokeInBox,
          pokemon,
          snorlaxFavorite,
          bonus,
        })}>
          <PokemonDataIcon src="/images/generic/search.png" alt={t2('Rating.Title')} invert/>
        </button>
      </Flex>
    </>
  );
};
