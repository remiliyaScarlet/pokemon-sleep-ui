'use client';
import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useUserDataActor} from '@/hooks/userData/actor';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeboxPokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxEditUploadStatus} from '@/ui/team/pokebox/editor/uploadStatus';
import {PokeboxPickerInput} from '@/ui/team/pokebox/filter/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {showToast} from '@/utils/toast';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  initialPokebox: Pokebox,
};

export const PokeboxLoadedClient = ({initialPokebox, ...props}: Props) => {
  const {pokedexMap, subSkillMap} = props;

  const {act, status} = useUserDataActor();
  const t = useTranslations('Game');

  const [loading, setLoading] = React.useState(false);
  const [editingPokeInBox, setEditingPokeInBox] = React.useState<PokeInBoxEditorState>();
  // Keeping a local copy of the pokebox so no need to lazy load the whole box on every change
  // Not doing so could potentially create large unnecessary I/Os for large Pokebox
  const [pokebox, setPokebox] = React.useState(initialPokebox);
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
  const sortedPokemonInfo = useSortingWorker({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .map((pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return null;
        }

        const {level} = pokeInBox;

        return {
          pokemon,
          level,
          extra: pokeInBox,
          ingredients: getEffectiveIngredientProductions({level, ingredients: pokeInBox.ingredients}),
          ...getProducingRateSingleParams({...pokeInBox, subSkillMap}),
        };
      })
      .filter(isNotNullish) satisfies PokemonInfoWithSortingPayload<PokeInBox>[],
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    userBonus: {
      ingredient: filter.bonus.ingredient,
      overall: 0,
    },
    ...props,
    triggerDeps: [pokebox, filter],
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {sort: filter.sort, displayType: filter.displayType, viewType: filter.viewType},
    },
    triggerDeps: [filter.sort, filter.displayType, filter.viewType],
    delay: 0,
  });
  React.useEffect(() => {
    if (status === 'completed') {
      showToast({content: <PokeboxEditUploadStatus success/>});
      return;
    }
    if (status === 'failed') {
      showToast({content: <PokeboxEditUploadStatus success={false}/>});
      return;
    }
  }, [status]);

  const pokemon = Object.values(pokedexMap).filter(isNotNullish);
  const sortedPokebox = sortedPokemonInfo.map(({source}) => source.extra);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPokeInBoxEditPopup
        pokebox={Object.fromEntries(sortedPokebox.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]))}
        editingPokeInBox={editingPokeInBox}
        setEditingPokeInBox={setEditingPokeInBox}
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
      <PokeboxPickerInput
        pokemon={pokemon}
        onClick={(pokemonId) => setEditingPokeInBox({action: 'create', pokemonId})}
        {...props}
      />
      <AdsUnit/>
      <PokeboxContent
        filter={filter}
        setFilter={setFilter}
        pokebox={pokebox}
        pokemon={pokemon}
        loading={loading}
        isIncluded={isIncluded}
        setEditingPokeInBox={setEditingPokeInBox}
        sortedPokemonInfo={sortedPokemonInfo}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};
