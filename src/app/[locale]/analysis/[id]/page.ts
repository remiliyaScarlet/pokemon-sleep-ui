import {getTranslator} from 'next-intl/server';

import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {AnalysisPage} from '@/ui/analysis/page/main';
import {generatePageMeta} from '@/utils/meta';


export type AnalysisPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<AnalysisPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getTranslator(locale, 'Game.PokemonName');

  return generatePageMeta({key: 'Analysis.Page.Title', values: {name: t(id)}})({params});
};

export default AnalysisPage;
