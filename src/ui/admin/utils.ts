import {UserActivationData} from '@/types/mongo/user';
import {SiteAdminUserActivationData} from '@/ui/admin/type';

// This is needed because the type of `ObjectId` on `userId` is not serializable from server to client
export const toSiteAdminUserActivationData = ({
  userId,
  ...data
}: UserActivationData): SiteAdminUserActivationData => ({
  ...data,
  userId: userId.toString(),
});
