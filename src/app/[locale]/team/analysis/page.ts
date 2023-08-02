import {getTranslator} from 'next-intl/server';

import {GenerateMetadata} from '@/types/next/metadata';
import {TeamAnalysis} from '@/ui/team/analysis/main';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t('Team.Index.Title')} / ${t('Team.Calculate.Title')}`,
  };
};

export default TeamAnalysis;
