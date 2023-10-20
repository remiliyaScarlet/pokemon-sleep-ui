import {
  UserActivationData,
  UserActivationDataAtClient,
  UserActivationProperties,
  UserActivationPropertiesAtClient,
} from '@/types/mongo/activation';
import {PatreonMember} from '@/types/patreon/common/member';
import {toIsoDateString} from '@/utils/date';
import {showToast} from '@/utils/toast';
import {isNotNullish} from '@/utils/type';
import {defaultExpiryDays} from '@/utils/user/activation/const';


export const isActivationDataValid = ({source, contact, note}: UserActivationPropertiesAtClient) => {
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

export const toUserActivationDataAtClient = ({
  userId,
  expiry,
  generatedAt,
  ...data
}: UserActivationData): UserActivationDataAtClient => ({
  ...data,
  userId: userId.toString(),
  expiry: toIsoDateString(expiry),
  generatedAt: toIsoDateString(generatedAt),
});

export const toUserActivationProperties = ({
  expiry,
  ...data
}: UserActivationPropertiesAtClient): UserActivationProperties => ({
  ...data,
  expiry: new Date(expiry),
});

export const getActivationExpiry = (member?: PatreonMember): Date => {
  let expiry;

  if (member?.attributes.last_charge_date) {
    const {
      last_charge_date: lastChargeIsoUtc,
      pledge_cadence: cadence,
    } = member.attributes;

    expiry = new Date(lastChargeIsoUtc);
    expiry.setDate(expiry.getDate() + cadence * 31);
  } else {
    expiry = new Date();
    expiry.setDate(expiry.getDate() + defaultExpiryDays);
  }

  return expiry;
};
