import {getAllPokemonAsArray} from '@/controller/pokemon';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {AnalysisPage} from '@/ui/analysis/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams = async () => {
  return (await getAllPokemonAsArray()).map(({id}) => id);
};

export type AnalysisPageParams = GenerateMetadataParams & {
  id: string
};

export const generateMetadata: GenerateMetadata<AnalysisPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.PokemonName'});

  return generatePageMeta({key: 'Analysis.Title', values: {name: t(id)}})({params});
};

export default AnalysisPage;
