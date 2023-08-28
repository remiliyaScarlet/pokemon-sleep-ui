import {GenerateMetadata} from '@/types/next/metadata';
import {Pokebox} from '@/ui/team/pokebox/main';
import {getI18nTranslator} from '@/utils/i18n';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return {
    title: `${t('Team.Index.Title')} / ${t('Team.Box.Title')}`,
  };
};

export default Pokebox;
