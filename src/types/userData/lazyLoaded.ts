import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SleepdexMap} from '@/types/game/sleepdex';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';


export type UserLazyLoadedContent = {
  // Keys has to match `UserDataLoadingOpts['type']`
  teamAnalysisSetup: TeamAnalysisSetup,
  pokebox: Pokebox,
  pokeboxSorted: PokeInBox[],
  sleepdex: SleepdexMap,
  sleepdexOfPokemon: SleepdexMap,
};
