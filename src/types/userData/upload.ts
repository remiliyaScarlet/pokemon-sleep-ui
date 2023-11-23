import {PokeInBox} from '@/types/game/pokebox';
import {SleepdexData} from '@/types/game/sleepdex';
import {ActivationDataAtClient, ActivationKeyAtClient} from '@/types/mongo/activation';
import {ActivationPresetMap} from '@/types/mongo/activationPreset';
import {AnnouncementMap} from '@/types/mongo/announcement';
import {DocsData, DocsDataEditable, DocsDataEditableFetched} from '@/types/mongo/docs';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
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
  type: 'sleepdex.mark' | 'sleepdex.unmark',
  data: SleepdexData,
} | {
  type: 'teamAnalysis',
  data: UserTeamAnalysisContent,
} | {
  type: 'cooking',
  data: UserCookingPreset,
} | {
  type: 'settings',
  data: UserSettings,
} | {
  type: 'admin.activation.update.key',
  data: ActivationKeyAtClient,
} | {
  type: 'admin.activation.update.data',
  data: ActivationDataAtClient,
} | {
  type: 'admin.activation.delete',
  data: string,
} | {
  type: 'admin.activation.preset.update',
  data: ActivationPresetMap,
} | {
  type: 'admin.announcements',
  data: AnnouncementMap,
} | {
  type: 'cms.docs.create',
  data: DocsDataEditable,
} | {
  type: 'cms.docs.edit',
  data: DocsDataEditableFetched,
} | {
  type: 'cms.docs.delete',
  data: Pick<DocsData, 'locale' | 'path'>,
};
