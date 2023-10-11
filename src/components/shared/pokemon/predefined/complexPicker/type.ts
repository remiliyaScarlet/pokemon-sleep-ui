import {PokemonInputFilter} from '@/components/shared/pokemon/input/type';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
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

export type PokemonComplexFilterDataProps = {
  pokemonList: PokemonInfo[],
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type PokemonComplexFilterCommonProps = PokemonComplexFilterDataProps & {
  onPokemonPicked: (opts: PokemonComplexFilterOnSelectOpts) => void,
};
