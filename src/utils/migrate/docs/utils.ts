import {defaultLocale} from '@/const/website';
import {DocsData} from '@/types/mongo/docs';
import {docsMigrators} from '@/utils/migrate/docs/migrators';
import {migrate} from '@/utils/migrate/main';
import {DeepPartial} from '@/utils/type';


export const getMigratedDocs = (override: DeepPartial<DocsData>) => migrate({
  original: {
    version: docsMigrators.length,
    locale: defaultLocale,
    path: '',
    title: '',
    content: '',
    showIndex: true,
    lastUpdatedEpoch: Date.now(),
    viewCount: 0,
    related: [],
  },
  override,
  migrators: docsMigrators,
  migrateParams: {},
});
