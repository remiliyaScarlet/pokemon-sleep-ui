import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SynergizedSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxDataProps = UsePokemonFilterCommonData & SynergizedSettingsRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  ingredientMap: IngredientMap,
  pokemonMaxLevel: number,
  preloaded: {
    bundle: UserSettingsBundle,
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};

export type PokeboxCommonProps = PokeboxDataProps & {
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};
