import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokedexMap} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {UserSettings} from '@/types/userData/settings';


export type SkillTriggerComparerServerDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  preloadedSettings: UserSettings,
};
