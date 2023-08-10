import mongoPromise from '@/lib/mongodb';


export const getUserCount = async () => {
  return (await mongoPromise)
    .db('auth')
    .collection('users')
    .estimatedDocumentCount();
};
