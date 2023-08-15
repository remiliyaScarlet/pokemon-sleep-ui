import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Pokebox} from '@/types/game/pokebox';
import {PokemonInfo} from '@/types/mongo/pokemon';
import {PokeboxContentPokeInBox} from '@/ui/team/pokebox/content/pokeInBox';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';


type Props = PokeboxCommonProps & {
  pokebox: Pokebox,
  pokemon: PokemonInfo[],
};

export const PokeboxContent = ({pokebox, pokemon, ...props}: Props) => {
  const {pokedexMap} = props;
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({pokebox, pokedexMap});

  return (
    <Flex direction="col" className="gap-1.5">
      <PokeboxViewerInput filter={filter} setFilter={setFilter} pokemon={pokemon}/>
      <Flex direction="row" wrap className="gap-1.5">
        {pokebox.map((pokeInBox, idx) => {
          const key = pokeInBox.id ?? `idx-${idx}`;

          if (Object.keys(isIncluded).length && !isIncluded[pokeInBox.pokemon]) {
            return <React.Fragment key={key}/>;
          }

          return (
            <PokeboxContentPokeInBox key={key} pokeInBox={pokeInBox} displayType={filter.displayType} {...props}/>
          );
        })}
      </Flex>
    </Flex>
  );
};
