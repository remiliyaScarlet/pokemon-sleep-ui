import React from 'react';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {EffectiveBonus} from '@/types/game/bonus';
import {PokeInBox} from '@/types/game/pokebox';
import {PokeboxCount} from '@/ui/team/pokebox/content/count';
import {PokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


type Props = PokeboxCommonProps & {
  filter: PokeboxViewerFilter,
  loading: boolean,
  bonus: EffectiveBonus,
  totalPokeInBox: number,
  sortedPokeInBox: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
};

export const PokeboxContent = (props: Props) => {
  const {
    filter,
    loading,
    totalPokeInBox,
    sortedPokeInBox,
    pokemonProducingParamsMap,
  } = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const ratingControl = useRatingPopup();

  return (
    <Flex direction="col" className="gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      {
        ratingControl.state.request &&
        <RatingResultPopup
          pokemon={ratingControl.state.request.setup.pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: ratingControl.state.request.setup.pokemon.id,
            pokemonProducingParamsMap,
          })}
          ratingControl={ratingControl}
          {...props}
        />
      }
      <PokeboxCount loading={loading} countToShow={sortedPokeInBox.length} total={totalPokeInBox}/>
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeInBoxView
          {...props}
          showPokemon={showPokemon}
          setRatingPopupControl={ratingControl.sendRequest}
          isLevelPreview={filter.previewLevel !== null}
        />
      </LazyLoad>
    </Flex>
  );
};
