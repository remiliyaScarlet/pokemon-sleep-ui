import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SleepdexMarkedByMap, SleepdexMarkedByPokemon} from '@/types/game/sleepdex';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';


export type UserLazyLoadedContent = {
  teamAnalysisSetup: TeamAnalysisSetup,
  pokebox: Pokebox,
  pokeboxSorted: PokeInBox[],
  sleepdexByMap: SleepdexMarkedByMap,
  sleepdexByPokemon: SleepdexMarkedByPokemon,
};
