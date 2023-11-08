import {patreonTierActivationLookup} from '@/const/activation/patreon';
import {getActivationPropertiesByPatreonContact} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {getPatreonMember} from '@/handler/patreon/api/member/main';
import {ActivationStatus} from '@/types/mongo/activation';
import {PatreonMember} from '@/types/patreon/common/member';
import {isPatronActive} from '@/utils/external/patreon';
import {getActivationExpiry} from '@/utils/user/activation/utils';


type GetActivationFromPatreonMemberOpts = {
  email: string,
  member: PatreonMember,
};

export const getActivationFromPatreonMember = ({
  email,
  member,
}: GetActivationFromPatreonMemberOpts): ActivationStatus | null => {
  const activeTier = member.relationships.currently_entitled_tiers.data.at(0);
  if (!activeTier) {
    /* eslint-disable no-console */
    console.log(`User of ${email} on Patreon does not seem to have entitled tiers`);
    /* eslint-enable no-console */

    return null;
  }

  const activation = patreonTierActivationLookup[activeTier.id];
  if (!activation) {
    console.warn(
      `Tier ID ${activeTier.id} is on user of ${email} on Patreon, but no associated activation configured`,
    );

    return null;
  }

  return activation;
};

export const toActivationPayloadFromPatreon = async (
  member: PatreonMember,
): Promise<ActionSendActivationPayload> => {
  const {id, attributes} = member;
  const {email} = attributes;

  if (!isPatronActive(member)) {
    return {email, activationProperties: null};
  }

  const memberData = await getPatreonMember({userId: id});

  const social = memberData.included[0].attributes.social_connections;
  const existedActivationProperties = (await getActivationPropertiesByPatreonContact(email));

  /* eslint-disable no-console */
  console.log(`>>> Converting Patreon member of ${id} (${email}) to activation payload`);
  if (existedActivationProperties) {
    console.log(`Existed activation properties of ${email} on Patreon:`, JSON.stringify(existedActivationProperties));
  }
  /* eslint-enable no-console */

  const activation = getActivationFromPatreonMember({email, member});
  if (!activation) {
    return {email, activationProperties: null};
  }

  return {
    email,
    activationProperties: {
      expiry: getActivationExpiry(member),
      activation,
      source: 'patreon',
      contact: {
        patreon: email,
        // Keep the existed ones and overwrite with Discord User ID linked to Patreon if once is available
        ...existedActivationProperties?.contact,
        ...(social?.discord && {discord: `<@${social.discord.user_id}>`}),
      },
      isSpecial: false,
      note: '',
    },
  };
};
