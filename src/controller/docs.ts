import {ObjectId} from 'bson';
import {Collection} from 'mongodb';

import {throwIfNotCmsMod} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {
  DocsData,
  DocsDataEditable,
  DocsDataEditableFetched,
  DocsDataFetched,
  DocsMetadata,
} from '@/types/mongo/docs';
import {Locale} from '@/types/next/locale';
import {getMigratedDocs} from '@/utils/migrate/docs/utils';
import {DeepPartial} from '@/utils/type';


const getCollection = async (): Promise<Collection<DocsData>> => {
  const client = await mongoPromise;

  return client
    .db('docs')
    .collection<DocsData>('content');
};

const getSanitizedDoc = (doc: DeepPartial<DocsData>): DocsData => {
  const {path, ...migrated} = getMigratedDocs(doc);
  const sanitizedPath = path.endsWith('/') ? path.slice(0, -1) : path;

  return {
    ...migrated,
    path: sanitizedPath,
  };
};

type UploadDocOpts<TDoc> = ControllerRequireUserIdOpts & {
  doc: TDoc,
};

export const addDoc = async ({executorUserId, doc}: UploadDocOpts<DocsDataEditable>) => {
  throwIfNotCmsMod(executorUserId);

  return (await getCollection()).insertOne(getSanitizedDoc(doc));
};

export const updateDoc = async ({executorUserId, doc}: UploadDocOpts<DocsDataEditableFetched>) => {
  throwIfNotCmsMod(executorUserId);

  // Explicit to avoid updating unwanted properties
  const {
    version,
    lastUpdatedEpoch,
    locale,
    path,
    title,
    content,
    showIndex,
  } = getSanitizedDoc(doc);

  return (await getCollection()).updateOne(
    {_id: new ObjectId(doc.id)},
    {$set: {version,
      lastUpdatedEpoch,
      locale,
      path,
      title,
      content,
      showIndex,
    } satisfies Omit<DocsData, 'viewCount'>},
  );
};

type DeleteDocOpts = ControllerRequireUserIdOpts & Pick<DocsData, 'locale' | 'path'>;

export const deleteDoc = async ({executorUserId, locale, path}: DeleteDocOpts) => {
  throwIfNotCmsMod(executorUserId);

  return (await getCollection()).deleteOne({locale, path});
};

type GetDocBySlugOpts = {
  locale: Locale,
  slug?: string[],
  count: boolean,
};

export const getDocBySlug = async ({locale, slug, count}: GetDocBySlugOpts): Promise<DocsDataFetched | null> => {
  if (!slug) {
    return null;
  }

  const doc = await (await getCollection()).findOneAndUpdate(
    {locale, path: slug.join('/')},
    {$inc: {viewCount: count ? 1 : 0}},
  );

  if (!doc) {
    return null;
  }

  return {
    id: doc._id.toString(),
    createdEpoch: doc._id.getTimestamp().getTime(),
    ...getSanitizedDoc(doc),
  };
};

export const getDocBySlugForEdit = async (
  opts: Omit<GetDocBySlugOpts, 'count'>,
): Promise<DocsDataEditableFetched | null> => {
  const doc = await getDocBySlug({...opts, count: false});

  if (!doc) {
    return null;
  }

  // Explicit to avoid returning additional property
  const {
    id,
    locale,
    path,
    title,
    content,
    showIndex,
  } = doc;

  return {id, locale, path, title, content, showIndex};
};

export const getDocsMetadataList = async (locale: Locale): Promise<DocsMetadata[]> => {
  const docs = (await getCollection()).find({locale}, {sort: {path: 1}});

  // Explicit to avoid sending additional data to client
  return docs
    .map(({_id, path, title, lastUpdatedEpoch, viewCount}) => ({
      path,
      title,
      createdEpoch: _id.getTimestamp().getTime(),
      lastUpdatedEpoch,
      viewCount,
    }))
    .toArray();
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({locale: 1, path: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize documentation index', e));
