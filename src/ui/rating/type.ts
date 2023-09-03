import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {PokemonSleepDataMap} from '@/types/game/sleepStyle';
import {UserSettings} from '@/types/userData/settings';


export type RatingSetupInputs = Omit<RatingSetupData, 'bonus'>;

export type RatingServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  sleepStyleMap: PokemonSleepDataMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  subSkillMap: SubSkillMap,
  mapMeta: FieldMetaMap,
  pokemonMaxLevel: number,
  preloadSettings: UserSettings,
};

export type RatingDataProps = RatingServerDataProps & {
  pokemonList: PokemonInfo[],
};

