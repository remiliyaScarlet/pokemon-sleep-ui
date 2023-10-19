import {UserActivationProperties} from '@/types/mongo/user';
import {showToast} from '@/utils/toast';
import {isNotNullish} from '@/utils/type';


export const isActivationDataValid = ({source, contact, note}: UserActivationProperties) => {
  if (!source && !note) {
    showToast({
      isAlert: true,
      content: 'Missing subscription source!',
    });
    return false;
  }

  if ((source && !contact[source]) || (!source && !Object.values(contact).filter(isNotNullish).length)) {
    showToast({
      isAlert: true,
      content: 'Missing contact of the subscription source!',
    });
    return false;
  }

  return true;
};
