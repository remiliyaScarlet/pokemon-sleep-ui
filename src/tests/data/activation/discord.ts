import {DiscordSubscriber} from '@/types/subscription/discord/data';


export const testDiscordMemberData: DiscordSubscriber[] = [
  // [0] Is subscriber, but not in activations
  {
    roleId: 'subscriber',
    userId: 'discordNoActivationId',
    discriminator: 0,
    username: 'discordNoActivation',
  },
  // [1] Is Subscriber, got pending activation key
  {
    roleId: 'subscriber',
    userId: 'discordPendingId',
    discriminator: 0,
    username: 'discordPending',
  },
  // [2] Is Subscriber, got active activation
  {
    roleId: 'subscriber',
    userId: 'discordActiveId',
    discriminator: 0,
    username: 'discordActive',
  },
];

