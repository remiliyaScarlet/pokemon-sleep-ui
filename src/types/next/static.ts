import {PageParams} from '@/types/next/page/common';


export type GenerateStaticParamsPageParams = PageParams;

export type GenerateStaticParamsOpts<P extends GenerateStaticParamsPageParams> = {
  params: P
};

export type GenerateStaticParamsFunc<T extends GenerateStaticParamsPageParams = GenerateStaticParamsPageParams> = (
  opts: GenerateStaticParamsOpts<T>,
) => T[] | Promise<T[]>;
