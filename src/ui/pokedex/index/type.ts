import {FilterInclusionMap} from '@/components/input/filter/type';
import {
  PokemonInfoRequiredForInput,
  PokemonInputFilter,
  PokemonInputType,
} from '@/components/shared/pokemon/input/type';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';


export type PokedexSinglePokemon = PokemonInfoRequiredForInput & {
  sleepStyles: SleepStyleData[],
};

export type PokedexData = PokedexSinglePokemon[];

export const pokedexDisplayType = [
  'berry',
  'mainSkill',
  'ingredient',
  'specialty',
] as const;

export type PokedexDisplayType = typeof pokedexDisplayType[number];

export type PokedexFilter = PokemonInputFilter<PokemonInputType> & {
  mapId: FilterInclusionMap<SleepMapId>,
  display: PokedexDisplayType,
};

export type PokedexLinkProps = PokedexSinglePokemon & Pick<PokedexFilter, 'display'>;
