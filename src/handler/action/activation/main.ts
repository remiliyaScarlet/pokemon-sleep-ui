import {generateActivationKey} from '@/controller/user/activation/key';
import {ActionSendActivationEmailPayload} from '@/handler/action/activation/type';
import {sendActivationEmail} from '@/utils/user/activation/email';


type ActionSendActivationEmailOpts = {
  payload: ActionSendActivationEmailPayload,
  sourceNote: string,
  getWarnOnNullActivation: (payload: ActionSendActivationEmailPayload) => string,
};

export const actionSendActivationEmail = async ({
  payload,
  sourceNote,
  getWarnOnNullActivation,
}: ActionSendActivationEmailOpts) => {
  const {email, activationProperties} = payload;

  if (!activationProperties) {
    console.warn(getWarnOnNullActivation(payload));
    return;
  }

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    ...activationProperties,
  });

  // `activationLink` is null if the same source already have an active activation key
  if (!activationLink) {
    return;
  }

  await sendActivationEmail({recipient: email, activationLink});
  // eslint-disable-next-line no-console
  console.log(`Activation email sent to ${email} with link ${activationLink} (${sourceNote})`);
};
