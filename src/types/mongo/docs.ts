import {Migratable} from '@/types/migrate';
import {Locale} from '@/types/next/locale';


export type DocsData = Migratable & {
  locale: Locale,
  path: string,
  title: string,
  content: string,
  showIndex: boolean,
  lastUpdatedEpoch: number,
  viewCount: number,
};

export type DocsDataEditable = Omit<DocsData, 'version' | 'lastUpdatedEpoch' | 'viewCount'>;
