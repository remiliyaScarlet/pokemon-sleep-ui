import {UserActivationData} from '@/types/mongo/user';
import {UserActivationDataAtClient} from '@/ui/admin/activation/type';


// This is needed because the type of `ObjectId` on `userId` is not serializable from server to client
export const toSiteAdminUserActivationData = ({
  userId,
  ...data
}: UserActivationData): UserActivationDataAtClient => ({
  ...data,
  userId: userId.toString(),
  expiry: data.expiry.toString(),
});
