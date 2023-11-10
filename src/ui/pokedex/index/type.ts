import {
  PokemonInputFilter,
  PokemonInputFilterExtended,
  UsePokemonFilterCommonData,
} from '@/components/shared/pokemon/filter/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingParams, PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SleepStyleNormal} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleNormal[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

export type PokedexDisplay = Migratable & Pick<PokemonInputFilter, 'mainSkill'> & {
  sort: PokemonSortType,
  display: PokedexDisplayType,
};

export type PokedexFilter = PokemonInputFilterExtended & PokedexDisplay & {
  name: string,
};

export type PokedexClientCommonProps = UsePokemonFilterCommonData & {
  pokedex: PokedexData,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  maxLevel: number,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
  preloaded: {
    display: Partial<PokedexDisplay> | undefined,
    settings: UserSettings,
  }
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display' | 'level'> & PokedexClientCommonProps & {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  snorlaxFavorite: SnorlaxFavorite,
  ingredients: IngredientProduction[],
  calculatedSettings: CalculatedUserSettings,
};
