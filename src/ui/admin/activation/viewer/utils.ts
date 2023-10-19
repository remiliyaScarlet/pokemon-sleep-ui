import {
  userActivationContact,
  UserActivationDataAtClient,
  UserActivationSource,
  UserIdToEmailMap,
} from '@/types/mongo/activation';
import {userActivationContactToText} from '@/ui/admin/activation/const';
import {userActivationButtonTextGetter} from '@/ui/admin/activation/viewer/const';
import {isNotNullish} from '@/utils/type';


type GetUserActivationButtonTextOpts = {
  data: UserActivationDataAtClient,
  source: UserActivationSource | null,
  userIdEmailMap: UserIdToEmailMap,
};

export const getUserActivationButtonText = ({
  data,
  source,
  userIdEmailMap,
}: GetUserActivationButtonTextOpts): string => {
  if (!source) {
    const contact = userActivationContact.map((channel) => {
      const contact = data.contact[channel];

      if (!contact) {
        return null;
      }

      return {channel, contact};
    })
      .filter(isNotNullish)
      .at(0);

    if (contact) {
      return `${contact.channel[0].toUpperCase()}: ${contact.contact}`;
    }

    return userIdEmailMap[data.userId] ?? data.userId;
  }

  return userActivationButtonTextGetter[source](data);
};

export const getUserActivationTitle = (source: UserActivationSource | null) => {
  if (!source) {
    return '(Free)';
  }

  return userActivationContactToText[source];
};
