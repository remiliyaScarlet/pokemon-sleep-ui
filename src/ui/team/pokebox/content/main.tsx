import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {useUserDataActor} from '@/hooks/userData/actor';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useEffectiveBonus} from '@/hooks/userData/settings';
import {Pokebox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeboxCount} from '@/ui/team/pokebox/content/count';
import {useFilteredSortedPokebox} from '@/ui/team/pokebox/content/hook';
import {PokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokemonList: PokemonInfo[],
  initialPokebox: Pokebox,
  editingPokeInBox: PokeInBoxEditorState | undefined,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
};

export const PokeboxContent = (props: Props) => {
  const {
    initialPokebox,
    setEditingPokeInBox,
    pokedexMap,
    preloaded,
  } = props;

  const t = useTranslations('Game');

  // Keeping a local copy of the pokebox so no need to lazy load the whole box on every change
  // Not doing so could potentially create large unnecessary I/Os for large Pokebox
  const [pokebox, setPokebox] = React.useState(initialPokebox);
  const [loading, setLoading] = React.useState(false);

  const {act, session} = useUserDataActor();

  const bonus = useEffectiveBonus({
    server: preloaded.settings,
    client: session.data?.user.preloaded.settings,
  });
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    pokebox,
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
    ...props,
  });
  const filteredSortedPokebox = useFilteredSortedPokebox({
    ...props,
    pokebox,
    filter,
    bonus,
    isIncluded,
    setLoading,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const ratingControl = useRatingPopup();

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {sort: filter.sort, displayType: filter.displayType, viewType: filter.viewType},
    },
    triggerDeps: [filter.sort, filter.displayType, filter.viewType],
    delay: 0,
  });

  return (
    <Flex direction="col" className="gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      <RatingResultPopup
        pokemon={ratingControl.state.request?.setup.pokemon}
        ratingControl={ratingControl}
        {...props}
      />
      <PokeInBoxEditPopup
        pokebox={Object.fromEntries(filteredSortedPokebox.map(({source}) => [source.extra.uuid, source.extra]))}
        onUpdateCompleted={(updated) => {
          if (act) {
            act({action: 'upload', options: {type: 'pokebox.upsert', data: updated}});
            setPokebox((original) => ({
              ...original,
              [updated.uuid]: updated,
            }));
          }
          setEditingPokeInBox(undefined);
        }}
        onCopyPokeInBox={(copyBase) => {
          if (act) {
            const uuid = v4();
            const duplicate = {...copyBase, uuid};

            act({action: 'upload', options: {type: 'pokebox.upsert', data: copyBase}});
            act({action: 'upload', options: {type: 'pokebox.create', data: duplicate}});
            setPokebox((original) => ({
              ...original,
              [copyBase.uuid]: copyBase,
              [uuid]: duplicate,
            }));
          }
          setEditingPokeInBox(undefined);
        }}
        onRemovePokeInBox={(toRemove) => {
          if (act) {
            act({action: 'upload', options: {type: 'pokebox.delete', data: toRemove}});
            setPokebox((original) => {
              const updated = {...original};
              delete updated[toRemove];

              return updated;
            });
          }
          setEditingPokeInBox(undefined);
        }}
        {...props}
      />
      <PokeboxViewerInput {...props} filter={filter} setFilter={setFilter}/>
      <PokeboxCount loading={loading} countToShow={filteredSortedPokebox.length} total={Object.keys(pokebox).length}/>
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeInBoxView
          {...props}
          filter={filter}
          sortedPokeInBox={filteredSortedPokebox}
          showPokemon={showPokemon}
          setRatingPopupControl={ratingControl.sendRequest}
          bonus={bonus}
        />
      </LazyLoad>
    </Flex>
  );
};
