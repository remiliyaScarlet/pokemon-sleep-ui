'use client';
import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeboxPokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeboxPickerInput} from '@/ui/team/pokebox/filter/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredients';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  initialPokebox: Pokebox,
};

export const PokeboxLoadedClient = ({initialPokebox, ...props}: Props) => {
  const {pokedexMap, subSkillMap} = props;

  const t = useTranslations('Game');

  const [loading, setLoading] = React.useState(false);
  const [editingPokeInBox, setEditingPokeInBox] = React.useState<PokeInBox>();
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

  const sortedPokebox = sortedPokemonInfo.map(({source}) => source.extra);
  const pokemon = Object.values(pokedexMap).filter(isNotNullish);

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPokeInBoxEditPopup
        pokebox={Object.fromEntries(sortedPokebox.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]))}
        editingPokeInBox={editingPokeInBox}
        setEditingPokeInBox={setEditingPokeInBox}
        onUpdateCompleted={() => {
          if (editingPokeInBox === undefined) {
            return;
          }
          setPokebox((original) => ({
            ...original,
            [editingPokeInBox.uuid]: editingPokeInBox,
          }));
          setEditingPokeInBox(undefined);
        }}
        onCopyPokeInBox={() => {
          if (editingPokeInBox === undefined) {
            return;
          }

          const uuid = v4();
          setPokebox((original) => ({
            ...original,
            [uuid]: {...editingPokeInBox, uuid},
          }));
          setEditingPokeInBox(undefined);
        }}
        onRemovePokeInBox={() => {
          if (editingPokeInBox === undefined) {
            return;
          }

          setPokebox((original) => {
            const updated = {...original};
            delete updated[editingPokeInBox.uuid];

            return updated;
          });
          setEditingPokeInBox(undefined);
        }}
        {...props}
      />
      <PokeboxPickerInput
        pokemon={pokemon}
        onClick={(id) => {
          const pokemon = pokedexMap[id];
          if (!pokemon) {
            return;
          }

          setEditingPokeInBox(generateNewPokeInBox({pokemon, ...props}));
        }}
        {...props}
      />
      <AdsUnit/>
      <PokeboxContent
        filter={filter}
        setFilter={setFilter}
        pokebox={pokebox}
        pokemon={pokemon}
        loading={loading}
        setPokebox={setPokebox}
        isIncluded={isIncluded}
        setEditingPokeInBox={setEditingPokeInBox}
        sortedPokemonInfo={sortedPokemonInfo}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};
