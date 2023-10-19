import {ObjectId} from 'bson';


const adminUid = process.env.NEXTAUTH_ADMIN_UID ? new ObjectId(process.env.NEXTAUTH_ADMIN_UID) : null;

export const isAdmin = (userId: string | undefined): boolean => {
  if (!userId) {
    return false;
  }

  return adminUid?.equals(new ObjectId(userId)) ?? false;
};

export const throwIfNotAdmin = (userId: string | undefined) => {
  if (!isAdmin(userId)) {
    throw new Error('Attempted to generate user activation key without admin privilege!');
  }
};
