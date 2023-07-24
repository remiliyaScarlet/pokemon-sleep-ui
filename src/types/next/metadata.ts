import {Metadata} from 'next';

import {Locale} from '@/types/next/locale';


export type GenerateMetadataParams = {
  locale: Locale,
};

export type GenerateMetadataOpts = {
  params: GenerateMetadataParams
};

export type GenerateMetadata = (opts: GenerateMetadataOpts) => PromiseLike<Metadata>;
