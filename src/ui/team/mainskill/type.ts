import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {PokemonOnDeskDataProps, PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokedexMap} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {CalculatedUserSettings, UserSettings} from '@/types/userData/settings';


export type SkillTriggerOnDeskState = PokemonOnDeskState & {
  level: number,
};

export type SkillTriggerCompareUnit = PokemonConfigPokemonData;

export type SkillTriggerComparerState = CalculatedUserSettings & {
  base: SkillTriggerCompareUnit | null,
};

export type SkillTriggerComparerServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type SkillTriggerComparerDataProps =
  SkillTriggerComparerServerDataProps &
  PokemonComplexFilterDataProps &
  PokemonOnDeskDataProps;
