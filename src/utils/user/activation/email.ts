import {sendEmail} from '@/utils/email';
import {getActivationEmailContent} from '@/utils/user/activation/content';


type SendActivationEmail = {
  recipient: string,
  activationLink: string,
};

export const sendActivationEmail = async ({recipient, activationLink}: SendActivationEmail) => {
  await sendEmail({
    server: process.env.SUBSCRIPTION_EMAIL_SERVER,
    from: process.env.SUBSCRIPTION_EMAIL_FROM,
    to: recipient,
    subject: 'Pokemon Sleep 訂閱啟用連結 / Subscription Activation Link',
    text: getActivationEmailContent(activationLink),
    html: getActivationEmailContent(activationLink).replaceAll('\n', '<br/>'),
  });
};
