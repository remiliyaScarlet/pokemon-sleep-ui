import {sendEmail} from '@/utils/email';


type SendUserActivationEmail = {
  recipient: string,
  activationLink: string,
};

export const sendUserActivationEmail = async ({recipient, activationLink}: SendUserActivationEmail) => {
  await sendEmail({
    server: process.env.SUBSCRIPTION_EMAIL_SERVER,
    from: process.env.SUBSCRIPTION_EMAIL_FROM,
    to: recipient,
    subject: 'Pokemon Sleep 訂閱啟用連結 / Subscription Activation Link',
    text: activationLink,
    html: activationLink,
  });
};
