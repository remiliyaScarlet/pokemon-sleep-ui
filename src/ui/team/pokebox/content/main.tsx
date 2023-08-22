import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeboxPokeInBoxUpdatePopup} from '@/ui/team/pokebox/content/edit/main';
import {PokeboxPokeInBoxView} from '@/ui/team/pokebox/content/pokeInBox/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {getIngredientPicks} from '@/utils/game/producing/ingredientPick';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
  setPokebox: React.Dispatch<React.SetStateAction<Pokebox>>,
};

export const PokeboxContent = ({pokebox, pokemon, setPokebox, ...props}: Props) => {
  const {session, pokedexMap, subSkillMap, mapMeta} = props;
  const t = useTranslations('Game');
  const [loading, setLoading] = React.useState(false);
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    session,
    pokebox,
    pokedexMap,
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
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
          ingredients: getIngredientPicks({
            pokemon,
            randomIngredientPicks: pokeInBox.randomIngredient,
          }),
          ...getProducingRateSingleParams({...pokeInBox, subSkillMap}),
        };
      })
      .filter(isNotNullish) satisfies PokemonInfoWithSortingPayload<PokeInBox>[],
    sort: filter.sort,
    snorlaxFavorite: filter.snorlaxFavorite,
    ...props,
    triggerDeps: [pokebox, filter],
    setLoading,
  });
  const [editingUuid, setEditingUuid] = React.useState<string>();

  useAutoUpload({
    opts: {
      type: 'pokebox',
      data: {pokebox, display: {sort: filter.sort, displayType: filter.displayType, viewType: filter.viewType}},
    },
    triggerDeps: [pokebox, filter.sort, filter.displayType, filter.viewType],
    delay: 0,
  });

  const sortedPokebox = sortedPokemonInfo.map(({source}) => source.extra);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPokeInBoxUpdatePopup
        pokebox={Object.fromEntries(sortedPokebox.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]))}
        editingUuid={editingUuid}
        onUpdateCompleted={(pokeInBox) => {
          if (editingUuid === undefined) {
            return;
          }
          setPokebox((original) => ({
            ...original,
            [editingUuid]: pokeInBox,
          }));
          setEditingUuid(undefined);
        }}
        onCopyPokeInBox={(pokeInBox) => {
          if (editingUuid === undefined) {
            return;
          }

          const uuid = v4();
          setPokebox((original) => ({
            ...original,
            [uuid]: {...pokeInBox, uuid},
          }));
          setEditingUuid(undefined);
        }}
        onRemovePokeInBox={() => {
          if (editingUuid === undefined) {
            return;
          }

          setPokebox((original) => {
            const updated = {...original};
            delete updated[editingUuid];

            return updated;
          });
          setEditingUuid(undefined);
        }}
        {...props}
      />
      <PokeboxViewerInput filter={filter} setFilter={setFilter} pokemon={pokemon} mapMeta={mapMeta}/>
      <LazyLoad loading={loading} className="gap-1.5">
        <PokeboxPokeInBoxView
          filter={filter}
          isIncluded={isIncluded}
          setEditingUuid={setEditingUuid}
          sortedPokemonInfo={sortedPokemonInfo}
          {...props}
        />
      </LazyLoad>
    </Flex>
  );
};
