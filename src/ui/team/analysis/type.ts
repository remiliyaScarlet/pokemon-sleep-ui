import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subskill';
import {SnorlaxFavorite, SnorlaxRankInMap} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';
import {UserLazyLoadedData} from '@/types/userData/main';


export type TeamAnalysisFilter = PokemonInputFilter & {
  snorlaxFavorite: SnorlaxFavorite,
};

export type TeamAnalysisServerDataProps = UsePokemonFilterCommonData & {
  pokedex: PokedexMap,
  berryMap: BerryDataMap,
  ingredientMap: IngredientMap,
  snorlaxRankData: SnorlaxRankInMap[],
  mapMeta: FieldMetaMap,
  subSkillMap: SubSkillMap,
};

export type TeamAnalysisDataProps = TeamAnalysisServerDataProps & {
  preloadedSetup: UserLazyLoadedData['teamAnalysisSetup'] | null | undefined,
};

export const teamAnalysisSlotName = ['A', 'B', 'C', 'D', 'E'] as const;

export type TeamAnalysisSlotName = typeof teamAnalysisSlotName[number];

export type TeamAnalysisMember = {
  level: number,
  pokemonId: PokemonId,
  nature: NatureId | null,
  subSkill: PokemonSubSkill,
};

export type TeamAnalysisBonus = {
  overall: number,
  ingredient: number,
};

export type TeamAnalysisTeamSetup = Migratable & {
  team: {[slot in TeamAnalysisSlotName]: TeamAnalysisMember | null},
  bonus: TeamAnalysisBonus,
};
