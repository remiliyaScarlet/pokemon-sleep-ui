import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';


export type PokemonOnDeskState = {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  snorlaxFavorite: SnorlaxFavorite,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  evolutionCount: number,
};

export type PokemonOnDeskDataProps = {
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
  mapMeta: FieldMetaMap,
  pokemonMaxLevel: number,
  ocrTranslations: OcrTranslationsForPokemonInfo,
  pokemonList: PokemonInfo[],
  maxEvolutionCount: number,
};
