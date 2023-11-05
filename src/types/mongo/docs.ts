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

export type DocsDataFetched = DocsData & {
  id: string,
  createdEpoch: number,
};

export type DocsDataEditable = Omit<DocsData, 'version' | 'lastUpdatedEpoch' | 'viewCount'>;

export type DocsDataEditableFetched = DocsDataEditable & {
  id: string,
};

export type DocsMetadata = Pick<
  DocsDataFetched,
  'path' | 'title' | 'createdEpoch' | 'lastUpdatedEpoch' | 'viewCount'
>;
