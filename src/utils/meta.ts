import {getTranslator} from 'next-intl/server';

import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {GenerateMetadata} from '@/types/next/metadata';


type GeneratePageMetaValues = {
  name: string,
};

type GeneratePageMetaOpts = {
  key: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({key, values}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t(key, values)} | ${t('SiteName')}`,
  };
};
