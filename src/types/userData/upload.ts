import {PokeInBox} from '@/types/game/pokebox';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox.display',
  data: PokeboxViewerDisplay,
} | {
  type: 'pokebox.create' | 'pokebox.upsert',
  data: PokeInBox,
} | {
  type: 'pokebox.delete',
  data: PokeInBox['uuid'],
} | {
  type: 'teamAnalysisSetup',
  data: TeamAnalysisSetup,
} | {
  type: 'cooking',
  data: UserCookingPreset,
} | {
  type: 'settings',
  data: UserSettings,
};
