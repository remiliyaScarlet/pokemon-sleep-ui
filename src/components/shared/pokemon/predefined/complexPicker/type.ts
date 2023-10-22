import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';


export type PokemonComplexFilter = PokemonInputFilter;

export type PokemonComplexFilterOnSelectOpts = {
  pokemon: PokemonInfo,
} & ({
  origin: 'pokedex',
  ingredients?: never,
  subSkill?: never,
  nature?: never,
} | {
  origin: 'ocr',
  ingredients?: never,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
} | {
  origin: 'pokebox',
  ingredients?: IngredientProductionAtLevels,
  subSkill?: PokemonSubSkill,
  nature?: NatureId | null,
});

export type PokemonComplexFilterDataProps = UsePokemonFilterCommonData & {
  pokemonList: PokemonInfo[],
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type PokemonComplexFilterCommonProps = PokemonComplexFilterDataProps & {
  onPokemonPicked: (opts: PokemonComplexFilterOnSelectOpts) => void,
};
