import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {UserDataUploadControlRow} from '@/components/shared/control/upload';
import {Pokebox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxUpdatePopup} from '@/ui/team/pokebox/content/edit/main';
import {PokeboxContentPokeInBox} from '@/ui/team/pokebox/content/pokeInBox';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
  pokedexMap: PokedexMap,
  setPokebox: React.Dispatch<React.SetStateAction<Pokebox>>,
};

export const PokeboxContent = ({pokebox, pokemon, setPokebox, ...props}: Props) => {
  const {pokedexMap} = props;
  const t = useTranslations('Game');
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    pokebox,
    pokedexMap,
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
  });

  const [editOriginIdx, setEditOriginIdx] = React.useState<number>();

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxPokeInBoxUpdatePopup
        pokebox={pokebox}
        editOriginIdx={editOriginIdx}
        onUpdateCompleted={(pokeInBox) => {
          if (editOriginIdx === undefined) {
            return;
          }
          setPokebox((original) => [
            ...original.slice(0, editOriginIdx),
            pokeInBox,
            ...original.slice(editOriginIdx + 1),
          ]);
          setEditOriginIdx(undefined);
        }}
        onCopyPokeInBox={(pokeInBox) => {
          if (editOriginIdx === undefined) {
            return;
          }

          // Shouldn't `original.concat()` because the modified data (whatever in the popup) is not reflected
          // in `original` yet
          setPokebox((original) => [
            ...original.slice(0, editOriginIdx),
            pokeInBox,
            ...original.slice(editOriginIdx + 1),
            pokeInBox,
          ]);
          setEditOriginIdx(undefined);
        }}
        onRemovePokeInBox={() => {
          if (editOriginIdx === undefined) {
            return;
          }

          setPokebox((original) => [
            ...original.slice(0, editOriginIdx),
            ...original.slice(editOriginIdx + 1),
          ]);
          setEditOriginIdx(undefined);
        }}
        {...props}
      />
      <PokeboxViewerInput filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      <UserDataUploadControlRow opts={{type: 'pokebox', data: pokebox}}/>
      <Flex direction="row" wrap className="gap-1.5">
        {pokebox.map((pokeInBox, idx) => {
          const key = pokeInBox.id ?? `idx-${idx}`;

          // Explicitly checking `false` because the data might not get into the filter data array for check,
          // therefore `isIncluded[pokeInBox.Pokémon]` will be undefined
          if (isIncluded[pokeInBox.pokemon] === false) {
            return <React.Fragment key={key}/>;
          }

          return (
            <PokeboxContentPokeInBox
              key={key}
              pokeInBox={pokeInBox}
              displayType={filter.displayType}
              onClick={() => setEditOriginIdx(idx)}
              {...props}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
