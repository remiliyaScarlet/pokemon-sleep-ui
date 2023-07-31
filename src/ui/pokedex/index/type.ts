import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonInfoRequiredForInput, PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';


export type PokedexSinglePokemon = PokemonInfoRequiredForInput & {
  sleepStyles: SleepStyleData[],
};

export type PokedexData = PokedexSinglePokemon[];

export type PokedexDisplayType = typeof pokedexDisplayType[number];

export type PokedexFilter = PokemonInputFilter & {
  mapId: FilterInclusionMap<SleepMapId>,
  display: PokedexDisplayType,
};

export type PokedexLinkProps = PokedexSinglePokemon & Pick<PokedexFilter, 'display'>;
