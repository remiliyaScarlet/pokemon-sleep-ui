import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SleepdexMap} from '@/types/game/sleepdex';
import {TeamAnalysisSetup} from '@/types/teamAnalysis';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysisSetup: TeamAnalysisSetup,
  pokebox: Pokebox,
  pokeboxSorted: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
};
