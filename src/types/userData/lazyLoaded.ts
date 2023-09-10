import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';


export type UserLazyLoadedDataType = UserDataLoadingOpts['type'];

export type UserLazyLoadedContent = {
  teamAnalysisSetup: TeamAnalysisSetup,
  pokebox: Pokebox,
  pokeboxSorted: PokeInBox[],
};
