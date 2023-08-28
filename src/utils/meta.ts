import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {GenerateMetadata} from '@/types/next/metadata';
import {getI18nTranslator} from '@/utils/i18n';


type GeneratePageMetaValues = {
  name: string,
};

type GeneratePageMetaOpts = {
  key: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({key, values}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return {
    title: `${t(key, values)} | ${t('SiteName')}`,
  };
};
