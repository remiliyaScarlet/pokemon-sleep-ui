import {PageParams} from '@/types/next/page/common';


export type DocsPageParams = PageParams & {
  slug: string[],
};
