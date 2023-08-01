import {getTranslator} from 'next-intl/server';

import {GenerateMetadata} from '@/types/next/metadata';
import {EnergyTeam} from '@/ui/energy/team/main';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t('Energy.Index.Title')} / ${t('Energy.Team.Title')}`,
  };
};

export default EnergyTeam;
