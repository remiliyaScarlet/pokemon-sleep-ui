import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskDataProps} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';


export type RatingSetupInputs = Omit<RatingSetupData, keyof CalculatedUserSettings>;

export type RatingServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  subSkillMap: SubSkillMap,
  mapMeta: FieldMetaMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type RatingDataProps = RatingServerDataProps & PokemonComplexFilterDataProps & PokemonOnDeskDataProps;
