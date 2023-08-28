import {Collection} from 'mongodb';

import {runPokeBoxMigrations} from '@/controller/migrate/pokebox';
import mongoPromise from '@/lib/mongodb';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {PokeInBoxData} from '@/types/mongo/pokebox';
import {isNotNullish} from '@/utils/type';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

export const getUserPokeboxSorted = async (owner: string | undefined): Promise<PokeInBox[]> => {
  if (!owner) {
    return [];
  }

  // Run migration first (will skip if nothing to migrate) before getting the Pokebox to avoid schema mismatch
  await migratePokeboxOfUser(owner);
  return await (await getCollection())
    .find({owner}, {projection: {owner: false, _id: false}, sort: [['pokemon', 'asc'], ['level', 'desc']]})
    .toArray();
};

export const getUserPokebox = async (owner: string | undefined): Promise<Pokebox> => {
  if (!owner) {
    return {};
  }

  const pokeboxArray = await getUserPokeboxSorted(owner);

  return Object.fromEntries(pokeboxArray.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]));
};

export const updateUserPokebox = async (owner: string, pokebox: Pokebox) => {
  await (await mongoPromise).withSession(async (session) => {
    await session.withTransaction(async () => {
      const collection = await getCollection();

      await collection.deleteMany({owner}, {session});
      const pokeboxAsArray = Object.values(pokebox).filter(isNotNullish);
      if (pokeboxAsArray.length) {
        await collection.insertMany(
          pokeboxAsArray.map((pokemon): PokeInBoxData => ({...pokemon, owner})),
          {session},
        );
      }
    });
  });
};

export const addSinglePokeInBox = async (owner: string, pokeInBox: PokeInBox) => (await getCollection()).insertOne({
  owner,
  ...pokeInBox,
});

export const migratePokeboxOfUser = async (owner: string) => {
  runPokeBoxMigrations(getCollection, owner)
    .catch((e) => console.error(`MongoDB failed to do run Pokebox migrations for ${owner}`, e));
};

const addPokeboxIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({owner: 1}),
    collection.createIndex({uuid: 1}, {unique: true}),
  ]);
};

addPokeboxIndex()
  .catch((e) => console.error('MongoDB failed to add Pokebox index', e));
