import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useUserDataActor} from '@/hooks/userData/actor';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxEditUploadStatus} from '@/ui/team/pokebox/editor/uploadStatus';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {showToast} from '@/utils/toast';
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
    subSkillMap,
    ingredientMap,
    berryDataMap,
  } = props;

  const t = useTranslations('Game');

  // Keeping a local copy of the pokebox so no need to lazy load the whole box on every change
  // Not doing so could potentially create large unnecessary I/Os for large Pokebox
  const [pokebox, setPokebox] = React.useState(initialPokebox);
  const [loading, setLoading] = React.useState(false);

  const {act, status} = useUserDataActor();
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
  const filteredSortedPokeInBox = useSortingWorker({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .filter(({uuid}) => isIncluded[uuid])
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
    ingredientMap,
    berryDataMap,
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

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeInBoxEditPopup
        pokebox={Object.fromEntries(filteredSortedPokeInBox.map(({source}) => [source.extra.uuid, source.extra]))}
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
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeInBoxView {...props} filter={filter} sortedPokeInBox={filteredSortedPokeInBox}/>
      </LazyLoad>
    </Flex>
  );
};
