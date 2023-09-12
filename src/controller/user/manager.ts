import {createUserDataManager} from '@/controller/user/common';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';

// Lazy-load

export const userDataTeamAnalysisSetup = createUserDataManager<TeamAnalysisSetup>('teamAnalysisSetup');

// Preload

export const userDataCooking = createUserDataManager<UserCookingPreset>('cooking');

export const userDataPokedex = createUserDataManager<PokedexDisplay>('pokedex');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');

export const userDataSettings = createUserDataManager<UserSettings>('settings');
