import {LocaleLayoutProps} from '@/types/next/layout';
import {PageParams} from '@/types/next/page/common';


export type GenerateStaticParamsPageParams = PageParams;

export type GenerateStaticParamsFunc<T extends GenerateStaticParamsPageParams = GenerateStaticParamsPageParams> = (
  params: LocaleLayoutProps,
) => Omit<T, 'locale'>[] | Promise<Omit<T, 'locale'>[]>;
