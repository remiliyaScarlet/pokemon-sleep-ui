import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokemonSleepDataMap} from '@/types/game/sleepStyle';
import {RatingSetupData} from '@/ui/rating/setup/type';


export type RatingServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  sleepStyleMap: PokemonSleepDataMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  subSkillMap: SubSkillMap,
  mapMeta: FieldMetaMap,
  pokemonMaxLevel: number,
};

export type RatingDataProps = RatingServerDataProps & {
  pokedex: PokemonInfo[],
};

export type RatingOpts = {
  pokemon: PokemonInfo | undefined,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  subSkillMap: SubSkillMap,
};

export type RatingWorkerOpts = RatingSetupData & RatingOpts;
