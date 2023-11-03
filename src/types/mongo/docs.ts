import {Migratable} from '@/types/migrate';
import {Locale} from '@/types/next/locale';


export type DocsData = Migratable & {
  locale: Locale,
  path: string,
  title: string,
  content: string,
  lastUpdatedEpoch: number,
  viewCount: number,
};
