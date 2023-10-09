import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SleepdexMap} from '@/types/game/sleepdex';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysis: UserTeamAnalysisContent,
  teamAnalysisMember: TeamAnalysisMember,
  pokebox: Pokebox,
  pokeboxSorted: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
};
