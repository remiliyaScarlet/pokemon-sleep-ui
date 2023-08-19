import {Locale} from '@/types/next/locale';


export type PageParams = {
  locale: Locale,
};

export type PageProps<TParams = {}> = {
  params: TParams,
  searchParams?: {[key: string]: string | string[] | undefined},
};
