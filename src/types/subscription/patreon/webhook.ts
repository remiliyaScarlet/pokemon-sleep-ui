import {PatreonMember} from '@/types/subscription/patreon/common/member';
import {PatreonResponse} from '@/types/subscription/patreon/common/response';


export type PatreonWebhookPayload = PatreonResponse<PatreonMember>;
