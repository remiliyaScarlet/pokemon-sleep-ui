import {getTranslator} from 'next-intl/server';

import {GenerateMetadata} from '@/types/next/metadata';
import {Constructing} from '@/ui/placeholder/constructing';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t('Team.Index.Title')} / ${t('Team.Maker.Title')}`,
  };
};


export default Constructing;
