import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {DocsData} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';


const getCollection = async (): Promise<Collection<DocsData>> => {
  const client = await mongoPromise;

  return client
    .db('docs')
    .collection<DocsData>('content');
};

type GetDocBySlugOpts = {
  locale: Locale,
  slug: string[],
};

export const getDocBySlug = async ({locale, slug}: GetDocBySlugOpts): Promise<DocsData | null> => {
  return getSingleData(getCollection(), {locale, path: slug.join('/')});
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({path: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize documentation index', e));
