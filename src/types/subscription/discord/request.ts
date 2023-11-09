import {ApiActionWithToken} from '@/types/api';


export type DiscordActivationGeneratePayload = ApiActionWithToken & {
  roleIds: string,
  discordId: string,
};
