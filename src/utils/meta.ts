import {getTranslator} from 'next-intl/server';

import {I18nValidNamespaces} from '@/types/i18n';
import {GenerateMetadata} from '@/types/next/metadata';


type GeneratePageMetaValues = {
  name: string,
};

type GeneratePageMetaOpts = {
  namespace: I18nValidNamespaces<IntlMessages>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({namespace, values}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, namespace);

  if (namespace === 'UI.Metadata.Home') {
    return {
      title: t('Title', values),
      colorScheme: 'dark',
    };
  }

  const t2 = await getTranslator(locale, 'UI.Metadata.Home');

  return {
    title: `${t('Title', values)} | ${t2('Title')}`,
    colorScheme: 'dark',
  };
};
