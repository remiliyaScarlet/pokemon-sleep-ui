import React from 'react';

import {useTranslations} from 'next-intl';
import {v4} from 'uuid';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {UserDataUploadControlRow} from '@/components/shared/control/upload';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxUpdatePopup} from '@/ui/team/pokebox/content/edit/main';
import {PokeboxContentPokeInBox} from '@/ui/team/pokebox/content/pokeInBox';
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
  const {session, pokedexMap, subSkillMap} = props;
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
    ...props,
    triggerDeps: [pokebox, filter],
    setLoading,
  });
  const sortedPokebox = sortedPokemonInfo.map(({source}) => source.extra);

  const [editingUuid, setEditingUuid] = React.useState<string>();

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
      <PokeboxViewerInput filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      <UserDataUploadControlRow
        opts={{
          type: 'pokebox',
          data: {pokebox, display: {sort: filter.sort, displayType: filter.displayType}},
        }}
      />
      <LazyLoad loading={loading} className="gap-1.5">
        {sortedPokemonInfo.map(({source}) => {
          const uuid = source.extra.uuid;

          // Explicitly checking `false` because the data might not get into the filter data array for check,
          // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
          if (isIncluded[source.pokemon.id] === false) {
            return <React.Fragment key={uuid}/>;
          }

          return (
            <PokeboxContentPokeInBox
              key={uuid}
              pokeInBox={source.extra}
              displayType={filter.displayType}
              onClick={() => setEditingUuid(uuid)}
              {...props}
            />
          );
        })}
      </LazyLoad>
    </Flex>
  );
};
