import {DiscordSubscriber} from '@/types/subscription/discord/data';


export const toDiscordSubscriberInfo = ({userId, username}: DiscordSubscriber) => {
  return `${userId} (@${username})`;
};
