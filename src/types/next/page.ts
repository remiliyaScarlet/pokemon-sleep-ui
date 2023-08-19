import {Locale} from '@/types/next/locale';


export type PageParams = {
  locale: Locale,
};

export type PageProps = {
  params: {},
  searchParams?: {[key: string]: string | string[] | undefined},
};
