import {DiscordActivationMessage} from '@/types/subscription/discord/request';


type SendDiscordActivationMessagesOpts = {
  activationMessages: DiscordActivationMessage[],
};

export const sendDiscordActivationMessages = async ({activationMessages}: SendDiscordActivationMessagesOpts) => {
  const response = await fetch(
    process.env.SUBSCRIPTION_DISCORD_SEND_ACTIVATION_URL,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activationMessages),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to send activation - ${response.status} ${response.statusText}`);
  }
};
