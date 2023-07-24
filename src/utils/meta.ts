import {getTranslator} from 'next-intl/server';

import {I18nValidNamespaces} from '@/types/i18n';
import {GenerateMetadata} from '@/types/next/metadata';


export const generatePageMeta = (namespace: I18nValidNamespaces): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, namespace);

  if (namespace === 'UI.Metadata.Home') {
    return {
      title: t('Title'),
      colorScheme: 'dark',
    };
  }

  const t2 = await getTranslator(locale, 'UI.Metadata.Home');

  return {
    title: `${t('Title')} | ${t2('Title')}`,
    colorScheme: 'dark',
  };
};
