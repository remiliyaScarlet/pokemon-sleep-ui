import React from 'react';

import {Flex} from '@/components/layout/flex';
import {UserDataUploadControlRow} from '@/components/shared/control/upload';
import {Pokebox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxUpdatePopup} from '@/ui/team/pokebox/content/edit/main';
import {PokeboxContentPokeInBox} from '@/ui/team/pokebox/content/pokeInBox';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
  pokedexMap: PokedexMap,
  setPokebox: React.Dispatch<React.SetStateAction<Pokebox>>,
};

export const PokeboxContent = ({pokebox, pokemon, setPokebox, ...props}: Props) => {
  const {pokedexMap} = props;
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({pokebox, pokedexMap});

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
