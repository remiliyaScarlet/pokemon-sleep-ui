import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {TeamAnalysisCompData} from '@/types/mongo/teamAnalysis';
import {TeamAnalysisComp} from '@/types/teamAnalysis';


const getCollection = async (): Promise<Collection<TeamAnalysisCompData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<TeamAnalysisCompData>('teamAnalysis/comp');
};

export const getTeamAnalysisCompsOfUser = (userId: string): Promise<TeamAnalysisCompData[]> => (
  getDataAsArray(getCollection(), {userId})
);

type UpdateTeamAnalysisCompsOpts = {
  userId: string,
  comps: TeamAnalysisComp[],
};

export const updateTeamAnalysisComps = async ({userId, comps}: UpdateTeamAnalysisCompsOpts) => {
  const collection = await getCollection();

  await collection.deleteMany({userId});
  await collection.insertMany(comps.map((comp) => ({userId, ...comp})));
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}),
    collection.createIndex({userId: 1, uuid: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize team analysis comp index', e));
