import {getTranslator} from 'next-intl/server';

import {GenerateMetadata} from '@/types/next/metadata';
import {EnergyAnalysis} from '@/ui/energy/analysis/main';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t('Energy.Index.Title')} / ${t('Energy.Analysis.Title')}`,
  };
};

export default EnergyAnalysis;
