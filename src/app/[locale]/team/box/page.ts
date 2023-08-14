import {getTranslator} from 'next-intl/server';

import {GenerateMetadata} from '@/types/next/metadata';
import {Pokebox} from '@/ui/team/pokebox/main';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t('Team.Index.Title')} / ${t('Team.Box.Title')}`,
  };
};


export default Pokebox;
