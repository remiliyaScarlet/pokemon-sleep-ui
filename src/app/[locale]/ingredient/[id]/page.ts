import {getIngredientMap} from '@/controller/ingredient';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {IngredientPage} from '@/ui/ingredient/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';
import {isNotNullish} from '@/utils/type';


export const generateStaticParams: GenerateStaticParamsFunc<IngredientPageParams> = async () => {
  return Object.values(await getIngredientMap())
    .filter(isNotNullish)
    .map(({id}) => ({id: id.toString()}));
};

export type IngredientPageParams = GenerateMetadataParams & {
  id: string,
};

export const generateMetadata: GenerateMetadata<IngredientPageParams> = async ({params}) => {
  const {id, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.Food'});

  return generatePageMeta({key: 'Ingredient.Page.Title', values: {name: t(id)}})({params});
};

export default IngredientPage;
