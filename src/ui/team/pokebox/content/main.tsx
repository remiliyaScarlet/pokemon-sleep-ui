import React from 'react';

import {useTranslations} from 'next-intl';

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
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
  setPokebox: React.Dispatch<React.SetStateAction<Pokebox>>,
};

export const PokeboxContent = ({pokebox, pokemon, setPokebox, ...props}: Props) => {
  const {session, pokedexMap} = props;
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
    data: pokebox
      .map((pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return null;
        }

        return {
          pokemon,
          level: pokeInBox.level,
          extra: pokeInBox,
        };
      })
      .filter(isNotNullish) satisfies PokemonInfoWithSortingPayload<PokeInBox>[],
    sort: filter.sort,
    ...props,
    triggerDeps: [pokebox, filter],
    setLoading,
  });
  const sortedPokebox = sortedPokemonInfo.map(({source}) => source.extra);

  const [editOriginIdx, setEditOriginIdx] = React.useState<number>();

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPokeInBoxUpdatePopup
        pokebox={sortedPokebox}
        editOriginIdx={editOriginIdx}
        onUpdateCompleted={(pokeInBox) => {
          if (editOriginIdx === undefined) {
            return;
          }
          setPokebox([
            ...sortedPokebox.slice(0, editOriginIdx),
            pokeInBox,
            ...sortedPokebox.slice(editOriginIdx + 1),
          ]);
          setEditOriginIdx(undefined);
        }}
        onCopyPokeInBox={(pokeInBox) => {
          if (editOriginIdx === undefined) {
            return;
          }

          setPokebox([
            ...sortedPokebox.slice(0, editOriginIdx),
            pokeInBox,
            ...sortedPokebox.slice(editOriginIdx + 1),
            pokeInBox,
          ]);
          setEditOriginIdx(undefined);
        }}
        onRemovePokeInBox={() => {
          if (editOriginIdx === undefined) {
            return;
          }

          setPokebox([
            ...sortedPokebox.slice(0, editOriginIdx),
            ...sortedPokebox.slice(editOriginIdx + 1),
          ]);
          setEditOriginIdx(undefined);
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
        {sortedPokemonInfo.map(({source}, idx) => {
          const key = source.pokemon.id ?? `idx-${idx}`;

          // Explicitly checking `false` because the data might not get into the filter data array for check,
          // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
          if (isIncluded[source.pokemon.id] === false) {
            return <React.Fragment key={key}/>;
          }

          return (
            <PokeboxContentPokeInBox
              key={key}
              pokeInBox={source.extra}
              displayType={filter.displayType}
              onClick={() => setEditOriginIdx(idx)}
              {...props}
            />
          );
        })}
      </LazyLoad>
    </Flex>
  );
};
