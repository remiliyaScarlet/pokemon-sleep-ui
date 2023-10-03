'use client';
import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useUserDataActor} from '@/hooks/userData/actor';
import {Pokebox} from '@/types/game/pokebox';
import {useCalculatedData} from '@/ui/team/pokebox/client/hooks';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxPickerInput} from '@/ui/team/pokebox/filter/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  initialPokebox: Pokebox,
};

export const PokeboxLoadedClient = (props: Props) => {
  const {pokedexMap, initialPokebox} = props;

  const {act, session} = useUserDataActor();

  const [loading, setLoading] = React.useState(false);
  // Keeping a local copy of the pokebox so no need to lazy load the whole box on every change
  // Not doing so could potentially create large unnecessary I/Os for large Pokebox
  const [pokebox, setPokebox] = React.useState(initialPokebox);
  const [editingPokeInBox, setEditingPokeInBox] = React.useState<PokeInBoxEditorState>();

  const {
    calculatedSettings,
    filter,
    setFilter,
    filteredSortedPokebox,
  } = useCalculatedData({
    ...props,
    pokebox,
    session,
    setLoading,
  });

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeInBoxEditPopup
        pokebox={Object.fromEntries(
          // Using `source.extra.uuid` to get the original poke-in-box
          // so the content opened in the edit popup won't have preview level, if active
          filteredSortedPokebox.map(({source}) => [source.extra.uuid, pokebox[source.extra.uuid]]),
        )}
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
        editingPokeInBox={editingPokeInBox}
        setEditingPokeInBox={setEditingPokeInBox}
        {...props}
      />
      <Flex direction="col" className="gap-1.5 lg:flex-row">
        <PokeboxPickerInput
          pokemonList={pokemonList}
          onClick={(pokemonId) => setEditingPokeInBox({action: 'create', pokemonId})}
          {...props}
        />
        <AdsUnit className="block lg:hidden"/>
        <PokeboxViewerInput {...props} pokemonList={pokemonList} filter={filter} setFilter={setFilter}/>
      </Flex>
      <AdsUnit className="hidden lg:flex"/>
      <PokeboxContent
        filter={filter}
        loading={loading}
        calculatedSettings={calculatedSettings}
        totalPokeInBox={Object.keys(pokebox).length}
        sortedPokeInBox={filteredSortedPokebox}
        setEditingPokeInBox={setEditingPokeInBox}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};
