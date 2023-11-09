import {generateDiscordActivationLink} from '@/handler/call/activation/generate/discord';
import {callDiscordActivationPoll} from '@/handler/call/activation/poll/discord';


export const PATCH = callDiscordActivationPoll;

export const POST = generateDiscordActivationLink;
