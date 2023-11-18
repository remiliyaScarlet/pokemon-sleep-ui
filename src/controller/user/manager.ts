import {createUserDataManager} from '@/controller/user/common';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';

// Preload

export const userDataCooking = createUserDataManager<UserCookingPreset>('cooking');

export const userDataPokedex = createUserDataManager<PokedexDisplay>('pokedex');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');

export const userDataSettings = createUserDataManager<UserSettings>('settings');
