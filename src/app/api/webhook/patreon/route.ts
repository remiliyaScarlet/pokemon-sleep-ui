import {handlePatreonWebhook} from '@/handler/webhook/patreon/main';


export const POST = (request: Request) => handlePatreonWebhook(request);
