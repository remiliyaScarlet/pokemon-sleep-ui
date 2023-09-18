import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {UserSettings} from '@/types/userData/settings';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  subSkillMap: SubSkillMap,
  ingredientMap: IngredientMap,
  pokemonMaxLevel: number,
  preloaded: {
    settings: UserSettings,
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};

export type PokeboxCommonProps = PokeboxDataProps & {
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};
