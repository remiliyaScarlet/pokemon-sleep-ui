import {activationContact, ActivationDataAtClient, ActivationSource} from '@/types/mongo/activation';
import {UserIdToEmailMap} from '@/types/mongo/auth';
import {activationContactToText} from '@/ui/admin/activation/const';
import {activationButtonTextGetter} from '@/ui/admin/activation/viewer/const';
import {isNotNullish} from '@/utils/type';


type GetActivationButtonTextOpts = {
  data: ActivationDataAtClient,
  source: ActivationSource | null,
  userIdEmailMap: UserIdToEmailMap,
};

export const getActivationButtonText = ({
  data,
  source,
  userIdEmailMap,
}: GetActivationButtonTextOpts): string => {
  if (!source) {
    const contact = activationContact.map((channel) => {
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

  return activationButtonTextGetter[source](data);
};

export const getActivationTitle = (source: ActivationSource | null) => {
  if (!source) {
    return '(Free)';
  }

  return activationContactToText[source];
};
