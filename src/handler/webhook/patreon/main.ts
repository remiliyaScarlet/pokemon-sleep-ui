import {patreonHeaderKeyOfSignature, patreonHeaderKeyOfTrigger} from '@/handler/webhook/patreon/const';
import {handlePatreonPledgeCreated} from '@/handler/webhook/patreon/create/main';
import {handlePatreonPledgeModified} from '@/handler/webhook/patreon/modify/main';
import {throwIfSignatureFailed} from '@/handler/webhook/patreon/utils';
import {PatreonEventType} from '@/types/subscription/patreon/common/enum';
import {PatreonWebhookPayload} from '@/types/subscription/patreon/webhook';


export const handlePatreonWebhook = async (request: Request) => {
  const message = await request.text();

  throwIfSignatureFailed({message, expected: request.headers.get(patreonHeaderKeyOfSignature)});

  const messageObj = JSON.parse(message) as PatreonWebhookPayload;
  const trigger = request.headers.get(patreonHeaderKeyOfTrigger) as PatreonEventType | null;

  /* eslint-disable no-console */
  console.log('Patreon Webhook trigger:', trigger);
  console.log('Patreon Webhook message received:', message);
  /* eslint-enable no-console */

  if (!trigger) {
    return Response.json({}, {status: 400});
  }

  if (trigger === 'members:pledge:create') {
    await handlePatreonPledgeCreated(messageObj);

    return Response.json(null, {status: 200});
  }

  if (trigger === 'members:pledge:update' || trigger === 'members:pledge:delete') {
    await handlePatreonPledgeModified(messageObj);

    return Response.json(null, {status: 200});
  }

  console.error(`Unhandled Patreon webhook trigger: ${trigger satisfies never}`);
  return Response.json({}, {status: 400});
};
