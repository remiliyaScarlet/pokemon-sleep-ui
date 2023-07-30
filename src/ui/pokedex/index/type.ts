import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/mongo/ingredient';
import {PokemonBerryId, PokemonInfo, PokemonSkillId, PokemonSleepTypeId, PokemonTypeId} from '@/types/mongo/pokemon';
import {SleepMapId, SleepStyleData} from '@/types/mongo/sleepStyle';
import {pokedexDisplayType} from '@/ui/pokedex/index/const';


export type PokedexSinglePokemon = Pick<
  PokemonInfo,
  'id' | 'type' | 'sleepType' | 'berry' | 'skill' | 'ingredients'
> & {
  sleepStyles: SleepStyleData[],
};

export type PokedexData = PokedexSinglePokemon[];

export type PokedexDisplayType = typeof pokedexDisplayType[number];

export type PokedexFilter = {
  type: FilterInclusionMap<PokemonTypeId>,
  mapId: FilterInclusionMap<SleepMapId>,
  sleepType: FilterInclusionMap<PokemonSleepTypeId>,
  ingredientFixed: FilterInclusionMap<IngredientId>,
  ingredientRandom: FilterInclusionMap<IngredientId>,
  berryId: FilterInclusionMap<PokemonBerryId>,
  skill: FilterInclusionMap<PokemonSkillId>,
  display: PokedexDisplayType,
};

export type PokedexLinkProps = PokedexSinglePokemon & Pick<PokedexFilter, 'display'>;
