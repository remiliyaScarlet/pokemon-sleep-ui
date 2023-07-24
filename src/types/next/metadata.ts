import {Metadata} from 'next';

import {Locale} from '@/types/next/locale';


export type GenerateMetadataParams = {
  locale: Locale,
};

export type GenerateMetadataOpts<P extends GenerateMetadataParams> = {
  params: P
};

export type GenerateMetadata<T extends GenerateMetadataParams = GenerateMetadataParams> = (
  opts: GenerateMetadataOpts<T>,
) => PromiseLike<Metadata>;
